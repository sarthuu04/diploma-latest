import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Trophy, BookOpen, Clock, BarChart3, GraduationCap, LogOut, RefreshCw, MapPin, Zap, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }

      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { 'x-auth-token': token }
      });
      setUserData(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProfile();
  }, []);

  useEffect(() => {
    if (location?.state?.updatedScores) {
      setUserData(prev => ({ 
        ...prev, 
        scores: location.state.updatedScores 
      }));
    }
  }, [location?.state?.updatedScores]);

  const scores = userData?.scores || [];
  const shortlisted = userData?.shortlistedColleges || [];
  
  const avg = scores.length > 0 
    ? (scores.reduce((acc, curr) => acc + Number(curr.score), 0) / scores.length).toFixed(1)
    : "0.0";

  if (loading) return (
    <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-black italic">
      <RefreshCw className="animate-spin mb-4 text-blue-500" size={48} />
      SYNCING WITH DATABASE...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* --- TOP NAVIGATION BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl text-white shadow-xl">
                    <User size={28} />
                </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Welcome, {userData?.name || 'Scholar'}</h1>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest mt-1">
                <Zap size={14} fill="currentColor" /> Student Account Active
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={fetchProfile} className="flex-1 md:flex-none px-6 py-3 bg-white/5 text-slate-300 rounded-2xl hover:bg-white/10 transition-all font-black flex items-center justify-center gap-2 border border-white/5">
              <RefreshCw size={18} /> REFRESH
            </button>
            <button 
              onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} 
              className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500/20 transition-all font-black flex items-center justify-center gap-2 border border-red-500/20"
            >
              <LogOut size={18} /> LOGOUT
            </button>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Tests Completed", val: scores.length, icon: <Trophy className="text-yellow-400" />, glow: "bg-yellow-400/10" },
            { label: "Average Performance", val: avg, icon: <BarChart3 className="text-blue-400" />, glow: "bg-blue-400/10" },
            { label: "Colleges Saved", val: shortlisted.length, icon: <GraduationCap className="text-emerald-400" />, glow: "bg-emerald-400/10" }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 text-center shadow-xl group hover:border-white/20 transition-all relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 ${stat.glow} blur-3xl -z-10`}></div>
                <div className="bg-slate-950 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                    {stat.icon}
                </div>
                <p className="text-slate-500 text-xs font-black uppercase mb-2 tracking-widest">{stat.label}</p>
                <h2 className="text-6xl font-black text-white tracking-tighter">{stat.val}</h2>
            </div>
          ))}
        </div>

        {/* --- MAIN CONTENT SECTIONS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Recent Results Card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/5 p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-xl flex items-center gap-3 text-white">
                    <Clock className="text-blue-400" /> Recent Activity
                </h3>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-black uppercase">Live Updates</span>
              </div>
              
              <div className="space-y-4">
                {scores.length > 0 ? [...scores].reverse().slice(0, 5).map((s, idx) => (
                  <div key={idx} className="group flex justify-between items-center p-6 bg-slate-950/50 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black">
                            {idx + 1}
                        </div>
                        <span className="font-bold text-slate-200 text-lg">{s.subject}</span>
                     </div>
                     <div className="text-right">
                        <span className="font-black text-2xl text-blue-400">{s.score}</span>
                        <span className="text-slate-600 font-bold"> / {s.total}</span>
                     </div>
                  </div>
                )) : (
                  <div className="text-center py-20 bg-slate-950/30 rounded-[2.5rem] border border-dashed border-white/10">
                    <p className="text-slate-500 font-black italic">NO TEST DATA FOUND</p>
                    <button onClick={() => navigate('/subjects')} className="mt-4 text-blue-400 text-sm font-black underline underline-offset-4">START YOUR FIRST TEST</button>
                  </div>
                )}
              </div>
          </div>

          {/* Colleges Card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/5 p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-xl flex items-center gap-3 text-white">
                    <GraduationCap className="text-emerald-400" /> Shortlisted Colleges
                </h3>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ChevronRight size={18} />
                </div>
              </div>

              <div className="space-y-4">
                {shortlisted.length > 0 ? shortlisted.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center p-6 bg-slate-950/50 border border-white/5 rounded-3xl hover:bg-slate-900 transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="bg-emerald-500/10 p-3 rounded-xl">
                             <MapPin className="text-emerald-400" size={20} />
                        </div>
                        <span className="font-bold text-slate-200 text-lg">{c.name}</span>
                     </div>
                     <span className="text-[10px] font-black text-slate-600 uppercase border border-white/10 px-3 py-1 rounded-lg tracking-widest">Saved</span>
                  </div>
                )) : (
                    <div className="text-center py-20 bg-slate-950/30 rounded-[2.5rem] border border-dashed border-white/10">
                        <p className="text-slate-500 font-black italic uppercase tracking-widest text-sm mb-4">Your Wishlist is Empty</p>
                        <button className="bg-white/5 text-slate-300 px-6 py-2 rounded-xl text-xs font-black border border-white/10">EXPLORE COLLEGES</button>
                    </div>
                )}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;