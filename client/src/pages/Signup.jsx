import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, GraduationCap, Loader2, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.user.name);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || "Check your details!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] -z-0"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Compact Card */}
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-6 md:p-8 shadow-2xl">
          
          {/* Header - Reduced Margins */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-3">
                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    <GraduationCap className="text-white w-8 h-8" />
                </div>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Create Account</h2>
            <p className="text-slate-500 font-bold text-xs mt-1">Join the diploma community</p>
            
            {error && (
              <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black rounded-lg animate-pulse uppercase">
                {error}
              </div>
            )}
          </div>

          {/* Form - Tightened Spacing */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400" />
                <input 
                  name="name" required type="text" onChange={handleChange}
                  placeholder="Sarthak Pujari" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400" />
                <input 
                  name="email" required type="email" onChange={handleChange}
                  placeholder="name@example.com" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400" />
                <input 
                  name="password" required type="password" onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500/50 text-white text-sm font-bold transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3.5 rounded-xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 group mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <>SIGN UP <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          {/* Footer - Reduced Padding */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-slate-500 font-bold text-xs">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-400 font-black hover:text-emerald-300 ml-1">
                LOG IN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;