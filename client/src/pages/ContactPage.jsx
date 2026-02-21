import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, PhoneCall, Sparkles, Loader2 } from 'lucide-react';

const ContactPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'College Prediction Issue',
    message: ''
  });

  // State for UI feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Message Dispatched Successfully!' });
        setFormData({ name: '', email: '', topic: 'College Prediction Issue', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to connect to server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex items-center justify-center px-6 overflow-hidden relative pt-10">
      
      {/* Signature Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -z-0"></div>
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 shadow-2xl">
              <Sparkles size={12} className="animate-pulse" /> Support Hub
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
              Get in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">Touch.</span>
            </h1>
            <p className="text-slate-500 font-bold mt-6 max-w-sm leading-relaxed">
              Have a doubt about your MHT-CET scores or college prediction? Our team is here to help you navigate your engineering journey.
            </p>
          </div>

          <div className="space-y-5">
            {[
              { icon: <Mail className="text-blue-400" />, label: "Email Us", val: "sarthakpujari1831@gmail.com" },
              { icon: <PhoneCall className="text-emerald-400" />, label: "Call Support", val: "+91 8329796735" },
              { icon: <MapPin className="text-red-400" />, label: "Office", val: "Pune, Maharashtra" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center group-hover:border-blue-500/40 group-hover:bg-slate-800/50 transition-all duration-300 shadow-xl">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.label}</p>
                  <p className="text-slate-200 font-bold group-hover:text-white transition-colors">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Glassmorphic Form Card */}
        <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-emerald-500/50 opacity-30"></div>

          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <MessageSquare size={24} />
                </div>
                Send Message
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Identity</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Full Name"
                    className="w-full px-5 py-3.5 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 outline-none text-white font-bold text-sm transition-all placeholder:text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email</label>
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="Email Address"
                    className="w-full px-5 py-3.5 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 outline-none text-white font-bold text-sm transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Topic</label>
                <div className="relative">
                    <select 
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/40 outline-none text-white font-bold text-sm appearance-none transition-all cursor-pointer"
                    >
                        <option value="College Prediction Issue" className="bg-slate-900">College Prediction Issue</option>
                        <option value="Account & Billing" className="bg-slate-900">Account & Billing</option>
                        <option value="General Inquiry" className="bg-slate-900">General Inquiry</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Message Content</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3" 
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-5 py-3.5 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/40 outline-none text-white font-bold text-sm transition-all resize-none placeholder:text-slate-700"
                ></textarea>
              </div>

              <button 
                disabled={isSubmitting}
                type="submit"
                className="w-full relative group bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4.5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(37,99,235,0.25)] flex items-center justify-center gap-3 mt-4 overflow-hidden uppercase"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <span className="relative z-10">DISPATCH MESSAGE</span>
                    <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Status Messages */}
            {status.msg && (
              <div className={`mt-4 text-center text-[10px] font-black uppercase tracking-widest ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {status.msg}
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Live response time: <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-4">~2 Hours</span>
                </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;