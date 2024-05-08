const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:
    {
        type: String,
        required: true,
        unique: true,
    },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  
  role: {
    type: String,
    default: "seller"
  },
   timestamp: { type: Date, default: Date.now },
   
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
