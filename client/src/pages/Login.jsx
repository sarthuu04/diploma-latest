import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, GraduationCap, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -z-0"></div>
      
      <div className="relative z-10 w-full max-w-md">
        
        {/* Decorative Badge */}
        <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-black uppercase tracking-widest shadow-2xl">
                <ShieldCheck size={14} /> Secure Access
            </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="relative inline-block group">
                <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform transition hover:rotate-6">
                    <GraduationCap className="text-white w-12 h-12" />
                </div>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-400 font-bold text-sm">Sign in to your student command center</p>
            
            {/* Error Alert */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black rounded-2xl animate-in fade-in slide-in-from-top-2">
                {error.toUpperCase()}
              </div>
            )}
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Identity</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@university.com" 
                  className="w-full pl-14 pr-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white font-bold transition-all placeholder:text-slate-700"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Security Key</label>
                    <button type="button" className="text-[10px] font-black text-blue-500 hover:text-blue-400 transition uppercase tracking-tighter">
                        Recovery?
                    </button>
                </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="w-full pl-14 pr-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white font-bold transition-all placeholder:text-slate-700"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="group relative w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              ) : (
                <>
                  <span className="relative z-10">AUTHENTICATE</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 font-bold text-sm">
              New to the platform?{' '}
              <Link to="/signup" className="text-blue-400 font-black hover:text-blue-300 transition-colors ml-1">
                JOIN NOW
              </Link>
            </p>
          </div>
        </div>

        {/* Floating Background Sparkle Icons */}
        <Sparkles className="absolute -top-10 -right-10 text-blue-500/20 w-24 h-24 blur-sm" />
      </div>

      {/* Tailwind Custom Keyframes (Add to your global CSS if needed, or inline) */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Login;