const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/register'); // Adjust the path as needed
const uuid = require('uuid');
const Admin = require('../models/adminModel');
const Seller = require('../models/sellerProfile');


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const generateUserId = () => {
  return uuid.v4(); // Generates a version 4 (random) UUID
};

const registerUser = async (req, res) => {
    console.log(req.body);
  try {
    const { username, email, password, phoneNumber ,gender} = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    

    const newUser = new User({
      username,
      email,
      password,
      phoneNumber,
      userId: generateUserId(),
      gender,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error while registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the User, Admin, or Seller database
    const user = await User.findOne({ email });
    const isAdmin = await Admin.findOne({ email });
    const isSeller = await Seller.findOne({ email }); // Use the correct model name

    if (!user && !isAdmin && !isSeller) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Check the password for the user
    if (user) {
      const isUserMatch = await bcrypt.compare(password, user.password);
      if (!isUserMatch) {
        if (isAdmin) {
          const isAdminMatch = await bcrypt.compare(password, isAdmin.password);
          if (!isAdminMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
          }
        }
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }

    // Check the password for the admin and seller

    console.log('Login successful');
    console.log(JWT_SECRET);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      userId: user ? user.userId : (isAdmin ? isAdmin.userId : isSeller._id),
      name: user ? user.name : (isAdmin ? isAdmin.name : isSeller.name),
      email: email,
      token: token,
      role: user ? 'user' : (isAdmin ? 'admin' : 'seller'), // Adjust the role based on the model
    });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  
};
