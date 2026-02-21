import React, { useState, useEffect, useRef } from 'react';
import { Timer, Trophy, Loader2, ChevronLeft, ChevronRight, CheckCircle2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const McqTest = () => {
  const questions = [
    { id: 1, question: "Which of the following contains both date and time?", options: ["Java.io.date", "Java.sql.date", "Java.util.date", "Java.util.dateTime"], correct: 2 },
    { id: 2, question: "Which of the following is advantage of using JDBC connection pool?", options: ["Slow performance", "Using more memory", "Using less memory", "Better performance"], correct: 3 },
    { id: 3, question: "Which of the following is advantage of using PreparedStatement in Java?", options: ["Slow performance", "Encourages SQL injection", "Prevents SQL injection", "More memory usage"], correct: 2 },
    { id: 4, question: "Which one of the following contains date information?", options: ["Java.sql.TimeStamp", "Java.sql.Time", "java.io.Time", "java.io.TimeStamp"], correct: 0 },
    { id: 5, question: "What does setAutoCommit(false) do?", options: ["commits transaction after each query", "explicitly commits transaction", "does not commit automatically", "never commits transaction"], correct: 2 },
    { id: 6, question: "Which of the following is used to call stored procedure?", options: ["Statement", "PreparedStatement", "CallableStatment", "CalledStatement"], correct: 2 },
    { id: 7, question: "Which of the following is used to limit the number of rows returned?", options: ["setMaxRows(int i)", "setMinRows(int i)", "getMaxrows(int i)", "getMinRows(int i)"], correct: 0 },
    { id: 8, question: "Which of the following is method of JDBC batch process?", options: ["setBatch()", "deleteBatch()", "removeBatch()", "addBatch()"], correct: 3 },
    { id: 9, question: "Which of the following is used to rollback a JDBC transaction?", options: ["rollback()", "rollforward()", "deleteTransaction()", "RemoveTransaction()"], correct: 0 },
    { id: 10, question: "Which of the following is not a JDBC connection isolation level?", options: ["TRANSACTION_NONE", "TRANSACTION_READ_COMMITTED", "TRANSACTION_REPEATABLE_READ", "TRANSACTION_NONREPEATABLE_READ"], correct: 3 }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const scoresRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: optionIndex });
  };

  const handleSubmit = async () => {
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (selectedOptions[index] === q.correct) finalScore++;
    });
    
    setScore(finalScore);
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.post('http://localhost:5000/api/scores/save', {
          subject: "Advanced Java - JDBC (Unit 1)",
          score: finalScore,
          total: questions.length
        }, {
          headers: { 'x-auth-token': token }
        });
        scoresRef.current = res?.data?.allScores || null;
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error saving score:", err);
      setIsSubmitted(true);
    } finally {
      setSaving(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full -z-0"></div>
        
        <div className="relative z-10 bg-slate-900/40 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/10 text-center max-w-xl w-full shadow-2xl">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-600 w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-orange-500/20 rotate-3">
            <Trophy className="w-14 h-14 text-white" />
          </div>
          
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Test Completed!</h2>
          <p className="text-slate-400 mb-10 font-bold uppercase tracking-widest text-sm">MSBTE Assessment Engine</p>
          
          <div className="bg-slate-950/60 border border-white/5 p-10 rounded-[2.5rem] mb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <p className="text-slate-500 text-xs font-black uppercase mb-4 tracking-tighter">Your Performance Score</p>
            <h4 className="text-7xl font-black text-white">{score} <span className="text-2xl text-blue-500">/ {questions.length}</span></h4>
          </div>

          <button 
            onClick={() => navigate('/dashboard', { state: { fromTest: true, updatedScores: scoresRef.current } })}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black text-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3"
          >
            Go to Dashboard <Zap className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-12 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2rem] p-8 mb-8 flex flex-col md:flex-row justify-between items-center border border-white/5 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
               Advanced Java <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-1 rounded-md uppercase">Unit 1</span>
            </h2>
            <p className="text-slate-500 text-sm font-bold mt-1">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          
          <div className="bg-slate-950/80 text-blue-400 px-8 py-4 rounded-2xl font-black flex items-center gap-3 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Timer className={`w-6 h-6 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : ''}`} />
            <span className="text-xl font-mono tracking-tighter">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="grid gap-5">
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionClick(index)}
                className={`group w-full text-left p-6 rounded-2xl border-2 font-bold transition-all duration-300 flex items-center justify-between
                  ${selectedOptions[currentQuestion] === index 
                    ? 'border-blue-500 bg-blue-600/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02]' 
                    : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'}`}
              >
                <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${selectedOptions[currentQuestion] === index ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-lg">{option}</span>
                </div>
                {selectedOptions[currentQuestion] === index && (
                    <CheckCircle2 className="w-6 h-6 text-blue-500 animate-in zoom-in" />
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-16 pt-10 border-t border-white/5">
            <button 
                disabled={currentQuestion === 0} 
                onClick={() => setCurrentQuestion(currentQuestion - 1)} 
                className="flex items-center gap-2 px-8 py-4 font-black text-slate-500 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={24} /> PREV
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button 
                onClick={handleSubmit} 
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                {saving ? (
                    <><Loader2 className="animate-spin" /> ANALYZING...</>
                ) : (
                    "SUBMIT TEST"
                )}
              </button>
            ) : (
              <button 
                onClick={() => setCurrentQuestion(currentQuestion + 1)} 
                className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                NEXT <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center mt-10 text-slate-600 font-bold text-xs uppercase tracking-[0.2em]">
            Automated Proctoring Enabled • ID: {Math.random().toString(36).substring(7).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default McqTest;