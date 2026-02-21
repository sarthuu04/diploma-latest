const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const https = require('https');

// Models Import
const User = require('./models/User'); 
const College = require('./models/College');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- NEW MODEL FOR CONTACT MESSAGES ---
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('ContactMessage', MessageSchema);

// --- GEMINI AI SETUP (Fixed Versioning) ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const validateGeminiKey = async () => {
  if (!process.env.GEMINI_API_KEY) return;
  try {
    const testModel = (typeof genAI.getGenerativeModel === 'function')
      ? genAI.getGenerativeModel({ model: GEMINI_MODEL })
      : genAI;

    let testRes;
    if (testModel && typeof testModel.generateText === 'function') {
      testRes = await testModel.generateText({ input: 'Hello' });
    } else if (testModel && typeof testModel.generate === 'function') {
      testRes = await testModel.generate({ prompt: 'Hello' });
    } else if (typeof genAI.generateText === 'function') {
      testRes = await genAI.generateText({ model: GEMINI_MODEL, input: 'Hello' });
    } else if (typeof genAI.generate === 'function') {
      testRes = await genAI.generate({ model: GEMINI_MODEL, prompt: 'Hello' });
    } else if (testModel && typeof testModel.generateContent === 'function') {
      testRes = await testModel.generateContent('Hello');
    } else {
      console.warn('Unable to validate Gemini API key: no supported client method found.');
      return;
    }
    console.log('✅ Gemini API key validated successfully.');
  } catch (err) {
    const msg = err?.toString() || '';
    console.error('[GoogleGenerativeAI Error]:', msg);
  }
};

validateGeminiKey();

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// --- AUTHENTICATION MIDDLEWARE ---
const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// --- ROUTES ---

// 0. CONTACT FORM SUBMISSION (NEW)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMessage = new Message({ name, email, topic, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 1. SIGNUP
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (err) { res.status(500).json({ message: "Server Error", error: err.message }); }
});

// 2. LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: "Server Error", error: err.message }); }
});

// 3. SCORE SAVING
app.post('/api/scores/save', auth, async (req, res) => {
  try {
    const { subject, score, total } = req.body;
    const user = await User.findById(req.user.id);
    user.scores.push({ subject, score, total, date: new Date() });
    await user.save();
    res.json({ message: "Score saved successfully!", allScores: user.scores });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 4. GET PROFILE
app.get('/api/auth/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('shortlistedColleges');
    res.json(user);
  } catch (err) { res.status(500).json({ message: "Server Error" }); }
});

// 5. COLLEGE PREDICTION
app.get('/api/colleges/predict', async (req, res) => {
  try {
    const { percentage, district, branch } = req.query;
    let query = {};
    if (district && district !== "All") query.district = district;
    if (branch && branch !== "All") query.branch = branch;
    const colleges = await College.find(query).sort({ cutoff: -1 });
    const results = colleges.map(col => {
      let chance = (parseFloat(percentage) >= col.cutoff) ? "High" : (parseFloat(percentage) >= col.cutoff - 3) ? "Medium" : "Low";
      return { ...col._doc, chance };
    });
    res.json(results);
  } catch (err) { res.status(500).json({ message: "Prediction failed" }); }
});

// 6. SHORTLIST
app.post('/api/user/shortlist', auth, async (req, res) => {
  try {
    const { collegeId } = req.body;
    const user = await User.findById(req.user.id);
    const index = user.shortlistedColleges.indexOf(collegeId);
    if (index > -1) user.shortlistedColleges.splice(index, 1);
    else user.shortlistedColleges.push(collegeId);
    await user.save();
    res.json({ list: user.shortlistedColleges });
  } catch (err) { res.status(500).json({ message: "Failed" }); }
});

// 7. AI CHATBOT ROUTE
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Message is required" });

    const modelObj = (typeof genAI.getGenerativeModel === 'function')
      ? genAI.getGenerativeModel({ model: GEMINI_MODEL })
      : genAI;

    let result;
    if (modelObj && typeof modelObj.generateContent === 'function') {
      result = await modelObj.generateContent(message);
    } else {
      throw new Error('No supported generate method found on the Gemini client');
    }

    const extractText = (r) => {
      if (!r) return null;
      if (typeof r === 'string') return r;
      if (r.response && typeof r.response.text === 'function') return r.response.text();
      return JSON.stringify(r);
    };

    const text = extractText(result) || 'No reply from AI';
    res.json({ reply: text });
  } catch (err) {
    console.error('Gemini API Error Detail:', err);
    res.status(500).json({ message: 'AI Busy', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));