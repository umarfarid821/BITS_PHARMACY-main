const UserOrder = require('../models/UserOrder');
const pastproductCart = require('../models/pastproductCart');

const productCart = require('../models/productCart');
const AddToOrder = async (req, res) => {
    const { shippingAddress, paymentMethod, cartItems, totalAmount } = req.body;
    console.log(req.body);
    
    try {
      const UserEmail = req.email; // Retrieve the user's email from the request
  
      // Create a new order document
      const newOrder = new UserOrder({
        UserEmail, // Save the user's email in the order
        shippingAddress,
        paymentMethod,
        cartItems,
        totalAmount,
      });
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
      res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  
      // Move items from current cart to past cart
      const productcartorder = await productCart.find({ UserEmail });
      for (const item of productcartorder) {
        console.log(item.Productname, item.Productprice, item.Noofproducts);
        const pastCartItem = new pastproductCart({
          UserEmail,
          Productname: item.Productname,
          Productprice: item.Productprice,
          Noofproducts: item.Noofproducts,
        });
        await pastCartItem.save();
      }
      console.log("Order placed successfully");
  
      // Delete the cart items
      for (const item of cartItems) {
        console.log('Deleting item with id:', item._id);
        await productCart.findByIdAndRemove(item._id);
      }
  
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Error placing order" });
    }
  }
  
    //get order 
    const getOrder = async (req, res) => {
        try {
            const order = await UserOrder.find();
            res.status(200).json(order);
        } catch (error) {
            console.error('Error while fetching order:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    //get order by email 
    const getOrderByEmail = async (req, res) => {
        const UserEmail=req.email;
        try {
            const order = await UserOrder.find({ UserEmail });
            res.status(200).json(order);
        } catch (error) {
            console.error('Error while fetching order:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };

    const deleteOrder = async (req, res) => {
        const { id } = req.params;
        try {
            const order = await UserOrder.findByIdAndDelete(id);
            res.status(200).json({ message: 'Order deleted successfully', order });
        } catch (error) {
            console.error('Error while deleting order:', error);
            res.status(500).json({ message: 'Server error' });
        }
    };


    module.exports = {

        AddToOrder,
        getOrder,
        getOrderByEmail,
        deleteOrder,

    };
