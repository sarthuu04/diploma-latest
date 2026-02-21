const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Advanced Java Unit 1"
  subject: { type: String, required: true }, // e.g., "Computer Engineering"
  semester: { type: Number, required: true, min: 1, max: 6 }, // 1 to 6
  type: { 
    type: String, 
    required: true, 
    enum: ['Note', 'PYQ', 'Model Answer', 'MCQ PDF'] // Only these types allowed
  },
  fileUrl: { type: String, required: true }, // The link from Cloudinary
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);