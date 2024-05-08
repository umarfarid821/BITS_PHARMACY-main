const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

UserEmail: {
    type: String,
    required: true,
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
  },
  paymentMethod: String,
  cartItems: [
    {
      
      Productname: String,
      Productprice: Number,
      Noofproducts: Number,
      
    },
  ],
  totalAmount: Number,
  OrderStatus: {
    type: String,
    default: "Order Not  Placed",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
