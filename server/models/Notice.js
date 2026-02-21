const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String },
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ['MSBTE', 'DTE', 'Scholarship'], default: 'MSBTE' }
});

module.exports = mongoose.model('Notice', NoticeSchema);