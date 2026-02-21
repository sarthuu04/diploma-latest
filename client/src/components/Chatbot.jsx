import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Bot, Sparkles, User, Zap } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ 
    role: 'ai', 
    text: 'Namaste! Main DiplomaPro AI hoon. Engineering admission ya MSBTE ke baare mein kuch bhi puchein.' 
  }]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', { message: input });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (err) {
      const errorText = err.response?.data?.error || "Maaf kijiye, connection error. Dobara koshish karein.";
      setMessages(prev => [...prev, { role: 'ai', text: errorText }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] font-sans">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`${isOpen ? 'bg-slate-800 rotate-90 shadow-none' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.4)]'} p-4 rounded-2xl text-white transition-all duration-300 transform active:scale-95 border border-white/10`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
          
          {/* Header: Cyber-Premium Style */}
          <div className="bg-gradient-to-br from-blue-600/20 to-slate-900 p-6 text-white border-b border-white/5 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-50"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-900/40">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-sm tracking-tight">DiplomaPro AI</p>
                    <Zap size={12} className="text-emerald-400 fill-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Core</p>
                  </div>
                </div>
              </div>
              <Sparkles size={18} className="text-blue-400/50" />
            </div>
          </div>

          {/* Messages Area: Dark Theme */}
          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-5 space-y-6 bg-slate-950/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}>
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-blue-400" />
                  </div>
                )}
                
                <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed shadow-xl transition-all ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none font-bold' 
                    : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-white/5 font-medium backdrop-blur-sm'
                }`}>
                  {m.text}
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-700 border border-white/10 flex items-center justify-center shrink-0">
                    <User size={16} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center">
                  <Bot size={16} className="text-blue-400 animate-bounce" />
                </div>
                <div className="bg-slate-800/80 border border-white/5 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area: Modern Glassmorphic */}
          <div className="p-5 bg-slate-900/80 border-t border-white/5 backdrop-blur-xl">
            <div className="flex gap-2 items-center bg-slate-950/50 p-2 rounded-2xl border border-white/5 focus-within:border-blue-500/50 focus-within:ring-4 ring-blue-500/10 transition-all">
              <input 
                className="flex-grow bg-transparent p-2.5 ml-1 outline-none text-sm text-slate-200 placeholder:text-slate-600 font-bold" 
                placeholder="Ask about admissions..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage} 
                disabled={!input.trim() || loading}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;