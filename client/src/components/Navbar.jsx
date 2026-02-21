import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogIn, Menu, User, LogOut, GraduationCap, MessageSquare, ChevronDown, FileText, History, CheckCircle, LayoutList } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // Resource Categories for the Mega Menu
  const resourceTypes = [
    { name: 'Study Notes', type: 'Note', icon: <FileText size={16} />, desc: 'Unit-wise theory' },
    { name: 'PYQ Papers', type: 'PYQ', icon: <History size={16} />, desc: 'Previous years' },
    { name: 'Model Answers', type: 'Model Answer', icon: <CheckCircle size={16} />, desc: 'Solution keys' },
    { name: 'MCQ PDFs', type: 'MCQ PDF', icon: <LayoutList size={16} />, desc: 'Practice sets' },
  ];

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
        <Link to="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors tracking-wide uppercase text-[11px]">
          Home
        </Link>
        <Link to="/mcq-test" className="text-sm font-bold text-slate-400 hover:text-white transition-colors tracking-wide uppercase text-[11px]">
          MCQ Tests
        </Link>

        {/* --- NEW: RESOURCES MEGA MENU --- */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsResourcesOpen(true)}
          onMouseLeave={() => setIsResourcesOpen(false)}
        >
          <button className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide transition-colors ${isResourcesOpen ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>
            Resources <ChevronDown size={12} className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mega Menu Dropdown */}
          <div className={`absolute top-full -left-20 mt-2 w-[480px] bg-slate-900 border border-white/5 rounded-2xl shadow-2xl p-5 transition-all duration-300 origin-top ${isResourcesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
            <div className="grid grid-cols-2 gap-3">
              {resourceTypes.map((item) => (
                <Link 
                  key={item.name} 
                  to={`/resources?type=${item.type}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all group/item"
                >
                  <div className="text-blue-500 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-[11px] font-black text-white uppercase tracking-wider group-hover/item:text-blue-400">{item.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Sem Filter */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Quick Semester Access</div>
              <div className="flex justify-between items-center bg-slate-950/50 p-1.5 rounded-xl border border-white/5">
                {[1, 2, 3, 4, 5, 6].map((sem) => (
                  <Link 
                    key={sem} 
                    to={`/resources?semester=${sem}`}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[11px] font-black text-slate-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                  >
                    {sem}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

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