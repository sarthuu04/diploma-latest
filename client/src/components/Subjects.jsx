import React from 'react';
import { Book, Layout, Code, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const subjects = [
  {
    name: "Operating Systems",
    code: "OSY",
    icon: <Layout className="w-8 h-8 text-blue-400" />,
    mcqs: "500+",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    name: "Java Programming",
    code: "JPR",
    icon: <Code className="w-8 h-8 text-orange-400" />,
    mcqs: "800+",
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    name: "Software Engineering",
    code: "SEN",
    icon: <Book className="w-8 h-8 text-emerald-400" />,
    mcqs: "400+",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    name: "Cyber Security",
    code: "PIS",
    icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
    mcqs: "600+",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "group-hover:border-purple-500/50"
  }
];

const Subjects = () => {
  return (
    <section id="subjects" className="relative py-24 bg-slate-950 overflow-hidden">
      
      {/* Background Glows for continuity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-sm font-bold mb-4">
            <Sparkles size={16} /> Course Catalog
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Diploma Subjects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium">
            Select a subject to master the curriculum. Each course is packed with 
            topper-verified MCQs and simplified digital notes.
          </p>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {subjects.map((sub, index) => (
            <div 
              key={index} 
              className={`group relative bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 transition-all duration-500 hover:-translate-y-3 hover:bg-slate-900/60 cursor-pointer ${sub.borderColor}`}
            >
              {/* Floating Gradient Glow inside card on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sub.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]`}></div>

              <div className="relative z-10">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/5`}>
                  {sub.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {sub.name}
                </h3>
                <p className="text-slate-500 font-bold text-xs tracking-widest uppercase mb-6">
                  Code: {sub.code}
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex flex-col">
                    <span className="text-white font-black text-lg">{sub.mcqs}</span>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">MCQs Available</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-full group-hover:bg-blue-600 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 font-medium italic">
            Don't see your subject? <span className="text-blue-400 cursor-pointer hover:underline">Request it here.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subjects;