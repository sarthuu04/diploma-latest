const mongoose = require('mongoose');



const CollegeSchema = new mongoose.Schema({

  name: { type: String, required: true },

  code: { type: String },

  district: { type: String },

  city: { type: String },

  cutoff: { type: Number },

  branch: { type: String },

  placement: { type: Number }

});



module.exports = mongoose.model('College', CollegeSchema);