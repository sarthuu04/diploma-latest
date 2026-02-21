const mongoose = require('mongoose');
const dotenv = require('dotenv');
const College = require('./models/College');

dotenv.config();

const collegeData = [
  // --- D. Y. Patil, Akurdi ---
  { name: "D. Y. Patil College of Engineering", code: "6272", district: "Pune", city: "Akurdi", cutoff: 96.5, branch: "Computer Engineering", placement: 6.5 },
  { name: "D. Y. Patil College of Engineering", code: "6272", district: "Pune", city: "Akurdi", cutoff: 94.2, branch: "Information Technology", placement: 6.5 },
  { name: "D. Y. Patil College of Engineering", code: "6272", district: "Pune", city: "Akurdi", cutoff: 88.5, branch: "Mechanical Engineering", placement: 5.5 },

  // --- PCCOER, Ravet ---
  { name: "Pimpri Chinchwad College of Engg & Research", code: "6822", district: "Pune", city: "Ravet", cutoff: 94.8, branch: "Computer Engineering", placement: 5.8 },
  { name: "Pimpri Chinchwad College of Engg & Research", code: "6822", district: "Pune", city: "Ravet", cutoff: 92.1, branch: "Information Technology", placement: 5.8 },

  // --- KIT, Kolhapur ---
  { name: "Kolhapur Institute of Technology (KIT)", code: "6267", district: "Kolhapur", city: "Gokul Shirgaon", cutoff: 91.2, branch: "Computer Engineering", placement: 4.8 },
  { name: "Kolhapur Institute of Technology (KIT)", code: "6267", district: "Kolhapur", city: "Gokul Shirgaon", cutoff: 85.5, branch: "Mechanical Engineering", placement: 4.2 },

  // --- RSCOE, Tathawade ---
  { name: "Rajarshi Shahu College of Engineering", code: "6141", district: "Pune", city: "Tathawade", cutoff: 93.2, branch: "Information Technology", placement: 5.2 },
  { name: "Rajarshi Shahu College of Engineering", code: "6141", district: "Pune", city: "Tathawade", cutoff: 91.5, branch: "Computer Engineering", placement: 5.2 },

  // --- DKTE, Ichalkaranji ---
  { name: "DKTE Society's Textile & Engineering Inst.", code: "6222", district: "Kolhapur", city: "Ichalkaranji", cutoff: 89.0, branch: "Computer Engineering", placement: 4.5 },
  { name: "DKTE Society's Textile & Engineering Inst.", code: "6222", district: "Kolhapur", city: "Ichalkaranji", cutoff: 84.0, branch: "Mechanical Engineering", placement: 4.0 },

  // --- MIT Alandi ---
  { name: "MIT Academy of Engineering", code: "6146", district: "Pune", city: "Alandi", cutoff: 95.5, branch: "Computer Engineering", placement: 6.2 },
  { name: "MIT Academy of Engineering", code: "6146", district: "Pune", city: "Alandi", cutoff: 93.0, branch: "Information Technology", placement: 6.2 },

  // --- Sinhgad, Vadgaon ---
  { name: "Sinhgad College of Engineering", code: "6177", district: "Pune", city: "Vadgaon", cutoff: 90.8, branch: "Information Technology", placement: 5.0 },
  { name: "Sinhgad College of Engineering", code: "6177", district: "Pune", city: "Vadgaon", cutoff: 88.0, branch: "Computer Engineering", placement: 5.0 },

  // --- RIT Islampur ---
  { name: "RIT Rajaramnagar", code: "6214", district: "Sangli", city: "Islampur", cutoff: 88.5, branch: "Computer Engineering", placement: 4.2 },
  { name: "RIT Rajaramnagar", code: "6214", district: "Sangli", city: "Islampur", cutoff: 82.0, branch: "Mechanical Engineering", placement: 3.8 }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding detailed data...");
    await College.deleteMany({}); 
    await College.insertMany(collegeData);
    console.log("✅ Detailed College Data with Branches Added!");
    process.exit();
  })
  .catch(err => console.log("❌ Seeding Error:", err));