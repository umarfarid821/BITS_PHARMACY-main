const mongoose = require('mongoose');

const sellerMedicines = new mongoose.Schema({
  medicinename: {
    type: String,
    required: true,
  },
    medicinecategory: {
        type: String,
        required: true,
    },
    expiryDate:
        {
            type: String,
            required: true,
        },
    manufacturingDate: {
        type: String,
        required: true,
    },
    madeIn: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    sellername: {

        type: String,
        required: true,
    },
specification: {
    type: String,
    required: true,
},
 
   timestamp: { type: Date, default: Date.now },
   
});

const Medicine = mongoose.model('SellerMedicine', sellerMedicines);

module.exports = Medicine;
