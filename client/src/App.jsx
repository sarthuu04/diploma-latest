import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Resources from './pages/Resources';
import AdminUpload from './pages/AdminUpload';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Subjects from './components/Subjects';
import Chatbot from './components/Chatbot'; 

// Pages
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import McqTest from './pages/McqTest';
import Dashboard from './pages/Dashboard';
import Counseling from './pages/Counseling';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      {/* Root Container: Using slate-950 for that deep premium dark look */}
      <div className="min-h-screen bg-slate-950 flex flex-col relative selection:bg-blue-500/30">
        
        {/* Navigation Bar */}
        <Navbar />
        
        {/* Main Content Area */}
        <div className="flex-grow relative">
          {/* Subtle Global Background Glow to add depth */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none -z-0"></div>
          
          <Routes>
            {/* 1. Landing Page */}
            <Route path="/" element={
              <>
                <Hero />
                <Subjects />
              </>
            } />

            {/* 2. Dedicated Pages */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 3. Student Features */}
            {/* Corrected path from /mcqs to /mcq-test to match Hero.jsx navigation */}
            <Route path="/mcq-test" element={<McqTest />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* 4. College Predictor & Counseling 🔥 */}
            <Route path="/counseling" element={<Counseling />} /> 
            <Route path="/resources" element={<Resources />} />
            <Route path="/admin-upload-secret" element={<AdminUpload />} />
          </Routes>
        </div>
        {/* Floating Chatbot */}
        <Chatbot />

        {/* --- BEAUTIFIED FOOTER SECTION --- */}
        <footer className="py-12 border-t border-white/5 bg-slate-950 relative overflow-hidden">
          {/* Decorative Gradient Line at the top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
            
            {/* Brand/Logo Area */}
            <div className="mb-6">
              <h2 className="text-xl font-black text-white tracking-tighter">
                Diploma<span className="text-blue-500">Pro</span>
              </h2>
              <p className="text-slate-500 font-bold text-[11px] mt-2 uppercase tracking-[0.3em]">
                Empowering the next generation of Engineers
              </p>
            </div>

            {/* Centered Structured Links */}
            <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-8">
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest hover:tracking-[0.15em]">
                Privacy Policy
              </Link>
              <div className="hidden md:block w-1 h-1 rounded-full bg-slate-800"></div>
              <Link to="/terms" className="text-slate-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest hover:tracking-[0.15em]">
                Terms of Service
              </Link>
              <div className="hidden md:block w-1 h-1 rounded-full bg-slate-800"></div>
              <Link to="/contact" className="text-blue-500 hover:text-blue-400 transition-all text-[11px] font-black uppercase tracking-widest hover:tracking-[0.15em]">
                Contact Us
              </Link>
            </nav>

            {/* Copyright Note */}
            <div className="pt-8 border-t border-white/5 w-full max-w-md">
              <p className="text-slate-600 text-[11px] font-medium tracking-tight">
                © 2026 DiplomaPro. Built with <span className="text-rose-500 animate-pulse">❤️</span> for Final Year Students.
              </p>
            </div>

          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;