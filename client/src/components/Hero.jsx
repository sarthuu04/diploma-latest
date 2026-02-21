import React from 'react';
import { CheckCircle, Star, GraduationCap, Award, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Added this

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div id="home" className="relative min-h-screen bg-slate-950 pt-24 pb-32 overflow-hidden">
      
      {/* --- PREMIUM BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-full h-full -z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        {/* --- LEFT SIDE: THE PITCH --- */}
        <div className="flex-1 text-center lg:text-left">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 text-blue-400 px-5 py-2 rounded-full text-sm font-bold mb-8 backdrop-blur-md hover:border-blue-500/50 transition-colors cursor-default">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" /> 
            Trusted by 10,000+ MSBTE Students
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6">
            Stop Guessing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              Start Scoring
            </span> 90%+
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed font-medium">
            Master your Final Year CS & IT exams with topper-verified MCQs, 
            Simplified Notes, and Model Answers. Built for speed, designed for success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            {/* Added onClick event here */}
            <button 
              onClick={() => navigate('/mcq-test')} 
              className="group relative bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)]"
            >
              <span className="flex items-center gap-2 justify-center">
                Start Free MCQ Test <Zap className="w-5 h-5 fill-white" />
              </span>
            </button>
            
            <a href="/contact" className="bg-slate-900/80 border border-slate-800 text-slate-200 px-10 py-5 rounded-2xl font-bold text-xl backdrop-blur-md hover:bg-slate-800 hover:text-white transition-all text-center">
              Contact Support
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-8 justify-center lg:justify-start text-slate-500 font-bold text-xs uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              2024 MSBTE Syllabus
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              MCQ-Based Pattern
            </span>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE GLASS CARD --- */}
        <div className="flex-1 relative w-full max-w-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[3.5rem] blur-3xl opacity-20 animate-pulse"></div>

          <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-1 shadow-2xl transition-transform hover:-translate-y-2 duration-700">
            <div className="bg-slate-950/60 rounded-[3.2rem] p-10 overflow-hidden relative">
              
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-4 rounded-3xl mb-6 shadow-xl shadow-emerald-900/20">
                  <Award className="w-10 h-10 text-white" />
                </div>
                
                <p className="text-blue-400 font-black tracking-[0.3em] mb-2 text-xs uppercase">Topper Profile</p>
                <h3 className="text-7xl font-black text-white mb-2 tracking-tighter">92.56%</h3>
                <p className="text-slate-500 text-sm font-bold mb-8">MSBTE FINAL YEAR • CLASS OF 2024</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 group hover:bg-white/10 transition-colors">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Total Marks</p>
                  <p className="text-2xl font-black text-white">707/750</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 group hover:bg-white/10 transition-colors">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Result</p>
                  <p className="text-2xl font-black text-emerald-400 italic">Distinction</p>
                </div>
              </div>

              <div className="w-full space-y-4 bg-black/30 p-6 rounded-[2.5rem] border border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-3 font-bold">
                    <GraduationCap size={18} className="text-blue-400"/> Programme
                  </span>
                  <span className="font-black text-white">Information Tech.</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-3 font-bold">
                    <TrendingUp size={18} className="text-blue-400"/> High Score
                  </span>
                  <span className="font-black text-white">MAD: 91/100</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-blue-300 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest">
                <CheckCircle size={14} className="text-emerald-400" /> Verified Result
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -right-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl hidden md:flex items-center gap-4 animate-bounce duration-[3000ms] hover:scale-110 transition-transform">
            <div className="w-3 h-12 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase">Sem-VI Record</p>
              <p className="text-2xl font-black text-white">94.27%</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;