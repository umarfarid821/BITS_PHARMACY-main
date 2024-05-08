const Seller = require('../models/sellerProfile');
const bcrypt = require('bcryptjs');
// Create a new seller
const createSeller = async (req, res) => {
    console.log(req.body);
  try {
    const {name, username, email, address,city,password, phoneNumber ,gender} = req.body;
   
    const existingUser = await Seller.findOne({ email });
   
    if (existingUser) {
      return res.status(400).json({ message: 'Seller already exists' });
    }
    

    const newUser = new Seller({
      username,
      name,
      email,
      password,
      phoneNumber,
      address,
      gender,
      city,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    console.error('Error while registering seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllSellers = async (req, res) => {
    try {
      const seller = await Seller.find({ role: 'seller' }); // Assuming 'role' is used to distinguish admins
  
      res.status(200).json(seller);
    } catch (error) {
      console.error('Error while fetching seller:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const getSellerById = async (req, res) => {
    const id = req.params.id;
    try {
      const seller = await Seller.findById(id);
      
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
      
      res.status(200).json(seller);
    } catch (error) {
      console.error('Error while fetching seller:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const deleteSeller = async (req, res) => {
    try {
        console.log(req.params.id);
      const sellerId = req.params.id; // Assuming you pass the admin's ID in the URL
  
      // Check if the admin exists
      const seller = await Seller.findById(sellerId);
  
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      // Delete the admin
      await Seller.findByIdAndDelete(sellerId);
      
      res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (error) {
      console.error('Error while deleting Seller:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {
    createSeller,
      getAllSellers,
      deleteSeller,
        getSellerById,
  };
  