const mongoose = require('mongoose');

const totalSchema = new mongoose.Schema({
   
    todayOrders: {
        type: Number,
        required: false
    },
    totalYesterdayOrders: {
        type: Number,
        required: false
    },
    totalOrders: {
        type: Number,
        required: false
    },
    totalSales:{
        type: Number,
        required: false
    }

  
});

module.exports = mongoose.model('Total', totalSchema);
