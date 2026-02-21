import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, FileText, ExternalLink, BookOpen } from 'lucide-react';

const Resources = () => {
  const location = useLocation();
  
  // States
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Syncing with URL parameters (from your Navbar)
  const queryParams = new URLSearchParams(location.search);
  const [selectedSem, setSelectedSem] = useState(queryParams.get('semester') || '');
  const [selectedType, setSelectedType] = useState(queryParams.get('type') || '');

  const categories = ['Note', 'PYQ', 'Model Answer', 'MCQ PDF'];
  const semesters = [1, 2, 3, 4, 5, 6];

  // Whenever the URL changes (from Navbar), update the filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('semester')) setSelectedSem(params.get('semester'));
    if (params.get('type')) setSelectedType(params.get('type'));
  }, [location.search]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/resources`, {
          params: { 
            semester: selectedSem, 
            type: selectedType, 
            search: searchTerm 
          }
        });
        setResources(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchResources, 300);
    return () => clearTimeout(delayDebounce);
  }, [selectedSem, selectedType, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">
            Study <span className="text-blue-500">Resource</span> Hub
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search by subject (e.g. Java, Python)..."
              className="w-full p-5 pl-14 bg-slate-900/50 rounded-2xl border border-white/5 focus:border-blue-500/50 outline-none transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Filters */}
          <aside className="space-y-8">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                <Filter size={14} /> Filter Semester
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setSelectedSem('')}
                  className={`py-3 rounded-xl font-bold text-xs transition-all border ${selectedSem === '' ? 'bg-blue-600 border-blue-500' : 'bg-slate-900 border-white/5 hover:border-white/20'}`}
                >ALL</button>
                {semesters.map(sem => (
                  <button 
                    key={sem}
                    onClick={() => setSelectedSem(sem)}
                    className={`py-3 rounded-xl font-bold text-xs transition-all border ${selectedSem == sem ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-900 border-white/5 hover:border-white/20'}`}
                  >S{sem}</button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">Material Type</h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedType(cat === selectedType ? '' : cat)}
                    className={`text-left px-5 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all border ${selectedType === cat ? 'bg-slate-800 border-blue-500 text-blue-400' : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'}`}
                  >
                    {cat}s
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
              </div>
            ) : resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((item) => (
                  <div key={item._id} className="group p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                        {item.type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">Sem {item.semester}</span>
                    </div>
                    <h2 className="text-xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-6">
                      {item.subject}
                    </p>
                    <a 
                      href={item.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-blue-600 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group-hover:shadow-lg group-hover:shadow-blue-900/20"
                    >
                      View PDF <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-white/10 text-center">
                <FileText className="text-slate-700 mb-4" size={48} />
                <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest">No matching resources found</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Resources;