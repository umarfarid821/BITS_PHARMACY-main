const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const adminController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if admin exists in the database
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // In a real application, compare the password hash
      if (admin.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token and send it as a response
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1d" });

      res.json({ token });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },
};
const getProfile = async (req, res) => {
    try {
        const email = req.email;
      
        const user = await Admin.findOne({ email
         });
    
        if (!user) {
          return res.status(404).json({ message: 'Admin not found' });
        }
    
        res.status(200).json({
          
            email: user.email,
            username: user.username,
            phoneNumber: user.phoneNumber,
            address:user.address,
            role:user.role,
            timestamp: user.timestamp,
            gender:user.gender,

          
        });
      } catch (error) {
        console.error('Error while fetching  adminprofile:', error);
        res.status(500).json({ message: 'Server error' });
      }
};

const Profile = require('../models/adminProfile');

// Function to add a new profile
const addProfile = async (req, res) => {
  const {  bio } = req.body;
  const photo = req.file.filename;

  // Access the user's mobileNumber from req.user or wherever it is stored
  const email = req.email; // Adjust this based on your actual implementation

  try {
    const profile = new Profile({
      
      bio,
      email,
      photo
    });

    await profile.save();
    return res.status(201).json({ profile });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add profile" });
  }
};
const getuserProfile = async (req, res) => {
    try {
      const email = req.email;
    
  
      const user = await Profile.findOne({ email
       });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        
        bio: user.bio,
       photo: user.photo,
      });
    } catch (error) {
      console.error('Error while fetching profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const updateProfile = async (req, res) => {
    try {
    

        const {  bio } = req.body;
        const profilePicture = req.file ? req.file.filename : null;
    
        await Profile.findOneAndUpdate(
          { email: req.email }, // Update based on the user's email
          {  bio, photo: profilePicture },
          { new: true }
        );
    
        res.json({ message: 'Profile updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile' });
      }
  };



module.exports = {
    adminController,
    getProfile,
    addProfile,
    getuserProfile,
    updateProfile,
    
  };