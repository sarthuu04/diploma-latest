import React, { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Loader2, FileText } from 'lucide-react';

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ title: '', subject: '', semester: 1, type: 'Note' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    setLoading(true);
    setStatus('Uploading to Cloudinary...');

    try {
      // 1. Prepare Data for Cloudinary
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "diploma_docs"); // The preset we created

      // 2. Upload using standard Axios (No library needed!)
      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/djjnn0tsi/raw/upload", 
        data
      );
      // NOTE: For PDFs, Cloudinary uses the '/raw/upload' or '/image/upload' endpoint.
      // If '/image/upload' gives an error for PDF, use '/raw/upload'.

      const pdfUrl = cloudRes.data.secure_url;
      setStatus('Saving to MongoDB...');

      // 3. Save to your Backend
      await axios.post("http://localhost:5000/api/resources", {
        ...formData,
        fileUrl: pdfUrl
      });

      setStatus('✅ Success! File added to Library.');
      setFile(null);
      e.target.reset(); // Clear the form
    } catch (err) {
      console.error("Upload Error:", err);
      setStatus('❌ Error: Check console or Cloudinary settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <form onSubmit={handleUpload} className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <Upload className="text-blue-500" size={24} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Admin Upload</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Document Title</label>
            <input type="text" placeholder="e.g. OS Unit 2 Notes" className="w-full bg-slate-800 p-4 rounded-xl outline-none border border-white/5 focus:border-blue-500/50 transition-all mt-1" 
              onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          </div>
          
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Subject</label>
            <input type="text" placeholder="e.g. Operating System" className="w-full bg-slate-800 p-4 rounded-xl outline-none border border-white/5 focus:border-blue-500/50 transition-all mt-1" 
              onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Semester</label>
              <select className="w-full bg-slate-800 p-4 rounded-xl outline-none border border-white/5 mt-1" onChange={(e) => setFormData({...formData, semester: e.target.value})}>
                {[1,2,3,4,5,6].map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Type</label>
              <select className="w-full bg-slate-800 p-4 rounded-xl outline-none border border-white/5 mt-1" onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="Note">Note</option>
                <option value="PYQ">PYQ</option>
                <option value="Model Answer">Model Answer</option>
                <option value="MCQ PDF">MCQ PDF</option>
              </select>
            </div>
          </div>

          <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors">
            <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])} required />
            <FileText className="mx-auto text-slate-500 mb-2" size={32} />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
              {file ? file.name : "Tap to select PDF"}
            </p>
          </div>

          <button disabled={loading} className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={18} />}
            {loading ? 'Processing...' : 'Upload to Library'}
          </button>
          
          {status && (
            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
               <p className="text-center text-[10px] font-black text-blue-400 uppercase tracking-widest">{status}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminUpload;