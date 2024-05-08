const e = require('express');
const Register = require('../models/adminModel'); // Assuming your model is in a 'models' directory
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller function to create a new admin
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';



const createAdmin = async (req, res) => {
    console.log(req.body);
  try {
    const { username, email, address,password, phoneNumber ,gender} = req.body;
   
    const existingUser = await Register.findOne({ email });
   
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    

    const newUser = new Register({
      username,
      email,
      password,
      phoneNumber,
      address,
      gender,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error while registering admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getAllAdmins = async (req, res) => {
    try {
      const admins = await Register.find({ role: 'Admin' }); // Assuming 'role' is used to distinguish admins
  
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error while fetching admins:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const deleteAdmin = async (req, res) => {
    try {
        console.log(req.params.id);
      const adminId = req.params.id; // Assuming you pass the admin's ID in the URL
  
      // Check if the admin exists
      const admin = await Register.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Delete the admin
      await Register.findByIdAndDelete(adminId);
      
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error('Error while deleting admin:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  createAdmin,
    getAllAdmins,
    deleteAdmin,
};
