const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
 
  UserEmail: {
    type: String,
    required: true,
  },
  Productname: {
    type: String,
    required: true,
  },
  Productprice: {
    type: Number,
    required: true,
  },
  Noofproducts: {
    type: Number,
    default: 1, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  

});

module.exports = mongoose.model("MedicineCart", cartSchema);
