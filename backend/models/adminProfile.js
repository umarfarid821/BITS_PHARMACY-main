const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  
  photo: {
    type: String, // Store the path or URL to the profile picture
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
},
   
});

const UserProfile = mongoose.model('AdminProfile', userProfileSchema);

module.exports = UserProfile;
