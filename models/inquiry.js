const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defines the structure of the document going into the
// database
const inquirySchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone_number: {
    type: String
  },
  services_requested: {
    type: Array
  },
  message: {
    type: String
  }
}, {timestamps: true, versionKey: false});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
module.exports = Inquiry;