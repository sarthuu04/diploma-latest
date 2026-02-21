import React from 'react';
import { Mail, Phone, Send, MessageSquare, Linkedin, Sparkles } from 'lucide-react';
// Keep your existing import path
import CEOPhoto from '../assets/CEO.jpeg'; 

const Contact = () => {
  return (
    <section id="contact" className="py-12 bg-slate-950 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Info & CEO Profile */}
          <div className="space-y-6">
            
            {/* ⭐ CEO Profile Card ⭐ */}
            <div className="flex items-center gap-5 p-2 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] w-fit pr-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-30"></div>
                <img 
                  src={CEOPhoto} 
                  alt="Sarthak Pujari" 
                  className="relative w-20 h-20 rounded-2xl object-cover border-2 border-white/10 shadow-2xl"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm animate-pulse"></div>
              </div>
              <div>
                <h4 className="text-xl font-black text-white leading-tight tracking-tight">Sarthak Pujari</h4>
                <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mt-1">Founder & CEO</p>
                <a 
                  href="https://www.linkedin.com/in/sarthakpujari1831/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-400 text-[10px] font-black transition mt-2 uppercase tracking-widest"
                >
                  <Linkedin size={12} /> Connection Request
                </a>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">
              <Sparkles className="w-3 h-3" /> Direct Support
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9]">
              Have Doubts? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">We're Here.</span>
            </h2>
            
            <p className="text-sm text-slate-500 font-bold max-w-sm leading-relaxed">
              Whether you need help with study material or technical support, our team is standing by to assist you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* Email Link */}
              <a href="mailto:sarthakpujari1831@gmail.com" className="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-blue-500/50 transition-all group">
                <div className="bg-blue-500/10 p-3 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Identity</p>
                  <p className="text-xs font-bold text-slate-300 truncate">sarthakpujari1831@gmail.com</p>
                </div>
              </a>

              {/* Phone Link */}
              <a href="tel:+918329796735" className="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-emerald-500/50 transition-all group">
                <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quick Dial</p>
                  <p className="text-xs font-bold text-slate-300">+91 8329796735</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] p-8 md:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <MessageSquare size={20} />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">Direct Message</h3>
            </div>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Name</label>
                  <input type="text" placeholder="Sarthak Pujari" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition placeholder:text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email Address</label>
                  <input type="email" placeholder="name@email.com" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition placeholder:text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Support Category</label>
                <select className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition cursor-pointer appearance-none">
                  <option className="bg-slate-900">General Inquiry</option>
                  <option className="bg-slate-900">Study Material Doubt</option>
                  <option className="bg-slate-900">Technical Issue</option>
                  <option className="bg-slate-900">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Your Message</label>
                <textarea rows="3" placeholder="How can we help you?" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition resize-none placeholder:text-slate-700"></textarea>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4.5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,99,235,0.3)] group text-xs tracking-[0.2em]">
                DISPATCH MESSAGE 
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;