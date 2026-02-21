import React, { useState } from 'react';
import axios from 'axios';
import { GraduationCap, MapPin, Percent, Building2, BookOpen, Search, Heart, Sparkles, Zap, Map } from 'lucide-react';

const Counseling = () => {
  const [percentage, setPercentage] = useState('');
  const [district, setDistrict] = useState('All');
  const [branch, setBranch] = useState('All');
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/colleges/predict?percentage=${percentage}&district=${district}&branch=${branch}`);
      setColleges(res.data);
    } catch (err) {
      console.error("Prediction failed", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleShortlist = async (collegeId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to save your shortlist!");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/user/shortlist', { collegeId }, { headers: { 'x-auth-token': token } });
      alert(res.data.message);
    } catch (err) {
      console.error("Shortlist error", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-12 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-blue-400 px-4 py-1.5 rounded-full text-sm font-black mb-6">
            <Sparkles size={16} /> AI-POWERED PREDICTOR 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Maharashtra <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">B.Tech Predictor</span>
          </h1>
          <p className="text-slate-400 font-bold max-w-2xl mx-auto italic">
            "Based on previous year DTE cut-off trends. Predict your future college in seconds."
          </p>
        </div>

        {/* Prediction Form - Glass Box */}
        <div className="bg-slate-900/40 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 opacity-50"></div>
          
          <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                <Percent size={14} className="text-blue-500" /> Percentage
              </label>
              <input 
                type="number" step="0.01" required placeholder="E.g. 92.50"
                className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white font-bold outline-none transition-all"
                value={percentage} onChange={(e) => setPercentage(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                <Map size={14} className="text-blue-500" /> District
              </label>
              <select 
                className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white font-bold outline-none cursor-pointer appearance-none transition-all"
                value={district} onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="All">All Districts</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Sangli">Sangli</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                <GraduationCap size={14} className="text-blue-500" /> Branch
              </label>
              <select 
                className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white font-bold outline-none cursor-pointer appearance-none transition-all"
                value={branch} onChange={(e) => setBranch(e.target.value)}
              >
                <option value="All">All Branches</option>
                <option value="Computer Engineering">Computer Engg</option>
                <option value="Information Technology">IT</option>
                <option value="Mechanical Engineering">Mechanical Engg</option>
                <option value="Civil Engineering">Civil Engg</option>
              </select>
            </div>

            <button type="submit" className="group bg-blue-600 hover:bg-blue-500 text-white h-[60px] rounded-2xl font-black transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 uppercase tracking-tighter">
              <Zap size={20} className="fill-white group-hover:animate-bounce" /> FIND COLLEGES
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {loading ? (
            <div className="text-center py-20 flex flex-col items-center">
               <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
               </div>
               <p className="font-black text-white text-2xl mt-6 tracking-tight">Syncing with DTE Database...</p>
               <p className="text-slate-500 font-bold mt-2">Hang tight, we're calculating your odds.</p>
            </div>
          ) : colleges.length > 0 ? (
            colleges.map((col, index) => (
              <div key={index} className="bg-slate-900/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 hover:bg-slate-900/50 hover:border-blue-500/30 transition-all duration-500 group">
                
                <div className="flex items-center gap-6 w-full lg:w-auto">
                  <div className="bg-slate-950 p-6 rounded-3xl text-blue-400 border border-white/5 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Building2 size={36} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors">{col.name}</h3>
                    <div className="flex flex-wrap gap-3 font-bold text-xs uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 bg-slate-950 text-slate-400 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
                        <MapPin size={14} className="text-red-500"/> {col.city}
                      </span>
                      <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/10">
                        <BookOpen size={14}/> {col.branch}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full lg:w-auto lg:gap-10 border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Placement</p>
                    <p className="text-2xl font-black text-emerald-400 font-mono">{col.placement} <span className="text-xs">LPA</span></p>
                  </div>
                  
                  <div className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl ${
                    col.chance === 'High' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-900/10' : 
                    col.chance === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                    'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {col.chance} Admission Chance
                  </div>

                  <button 
                    onClick={() => toggleShortlist(col._id)}
                    className="group/heart p-4 rounded-2xl bg-slate-950 border border-white/5 text-slate-600 hover:text-red-500 hover:border-red-500/30 transition-all active:scale-90 shadow-2xl"
                  >
                    <Heart size={24} className="group-hover/heart:fill-red-500 transition-all" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-slate-900/20 backdrop-blur-md rounded-[4rem] border-2 border-dashed border-white/10">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Search className="text-slate-600" size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Results Yet</h3>
              <p className="text-slate-600 font-bold mt-2">Enter your details and click "Find Colleges" to begin prediction.</p>
            </div>
          )}
        </div>

        {/* Disclaimer Section */}
        <div className="mt-20 p-8 bg-blue-600/5 rounded-3xl border border-blue-500/10 text-center">
            <p className="text-slate-500 text-xs font-bold leading-relaxed">
                <span className="text-blue-400 font-black mr-2 uppercase tracking-tighter">Disclaimer:</span> 
                This predictor is for informational purposes only. Actual admission results depend on the official DTE Maharashtra CAP rounds. 
                Check official merit lists for final decisions.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Counseling;