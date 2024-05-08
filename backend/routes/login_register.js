const express = require('express');
const router = express.Router();
const authController = require('../controllers/login_register'); // Adjust the path as needed



 router.post('/register', authController.registerUser);
 router.post('/login', authController.loginUser);
 


module.exports = router;
