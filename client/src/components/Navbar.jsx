import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogIn, Menu, User, LogOut, GraduationCap, MessageSquare, Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-slate-950/70 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100]">
      
      {/* 1. LOGO SECTION */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-900/20 group-hover:rotate-6 transition-transform">
          <BookOpen className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-black text-white tracking-tighter">
          Diploma<span className="text-blue-500">Pro</span>
        </span>
      </Link>

      {/* 2. DESKTOP NAVIGATION LINKS */}
      <div className="hidden md:flex items-center gap-7">
        {[
          { name: 'Home', path: '/' },
          { name: 'MCQ Tests', path: '/mcq-test' },
        ].map((link) => (
          <Link 
            key={link.name}
            to={link.path} 
            className="text-sm font-bold text-slate-400 hover:text-white transition-colors tracking-wide uppercase text-[11px]"
          >
            {link.name}
          </Link>
        ))}
        
        {/* Special Predictor Link */}
        <Link to="/counseling" className="flex items-center gap-1.5 text-blue-400 font-black hover:text-blue-300 transition uppercase text-[11px] tracking-widest bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/10">
          <GraduationCap size={16} />
          Predictor
        </Link>

        {token && (
          <Link to="/dashboard" className="text-sm font-bold text-slate-400 hover:text-white transition uppercase text-[11px] tracking-wide">
            Dashboard
          </Link>
        )}

        <Link to="/contact" className="text-slate-400 hover:text-white transition flex items-center gap-1.5 uppercase text-[11px] font-bold tracking-wide">
          <MessageSquare size={14} />
          Contact
        </Link>
      </div>

      {/* 3. ACTION BUTTONS */}
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link 
              to="/login" 
              className="text-[11px] font-black text-slate-400 hover:text-white transition uppercase tracking-widest hidden sm:block"
            >
              Log In
            </Link>

            <Link 
              to="/signup" 
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-[11px] hover:bg-blue-500 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/40 uppercase tracking-widest"
            >
              Get Started <LogIn size={14} />
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-900 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                <User className="w-3 h-3 text-blue-400" />
              </div>
              <span className="text-xs font-black text-slate-300 uppercase tracking-tighter">
                {userName || 'Student'}
              </span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-500/20 transition-all active:scale-90"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-slate-400 hover:text-white cursor-pointer transition">
          <Menu className="w-6 h-6" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;