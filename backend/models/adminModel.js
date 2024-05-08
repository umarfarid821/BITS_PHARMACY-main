const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true
  },

  role: {
    type: String,
    default: "Admin"
  },
   timestamp: { type: Date, default: Date.now },
   gender: {
    type: String,
   
    required: true,
  },
});

const Register = mongoose.model('Admin', userSchema);

module.exports = Register;
