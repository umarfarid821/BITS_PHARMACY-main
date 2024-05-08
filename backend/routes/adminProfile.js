const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const authController = require('../controllers/adminController');
const otherAdmin=require('../controllers/otharAdmin');
const { authenticateToken } = require('../middlewares/auth'); 

router.get('/profile', authenticateToken, authController.getProfile);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({ storage, fileFilter });
  
  // Route to add a profile
  router.post('/addprofile', authenticateToken, upload.single('photo'), authController.addProfile);
  router.get('/showprofile', authenticateToken, authController.getuserProfile);
  router.post('/update-profile', authenticateToken, upload.single('photo'), authController.updateProfile);
  router.post('/addadmin', authenticateToken, otherAdmin.createAdmin);
  
  router.get('/alladmin', authenticateToken, otherAdmin.getAllAdmins);
  router.delete('/:id', authenticateToken, otherAdmin.deleteAdmin);
module.exports = router;