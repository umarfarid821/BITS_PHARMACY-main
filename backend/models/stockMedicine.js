const mongoose = require('mongoose');

const stockMedicines = new mongoose.Schema({
 
  medicineId: {
    type: String,
    required: true,
    },
    medicineName: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    adminmedicineprice: {
        type: String,
        required: true,
    },
    adminmedicinequantity: {
        type: String,
        required: true,
    },

    nooftablets:{
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
  sellerName:{
    type:String,
    required: true,
  },
    
    


   
 
   timestamp: { type: Date, default: Date.now },
   
});

const Medicinestock = mongoose.model('MedicineStock', stockMedicines);

module.exports = Medicinestock;
