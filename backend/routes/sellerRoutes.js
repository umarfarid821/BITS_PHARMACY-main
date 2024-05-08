const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const { authenticateToken } = require('../middlewares/auth'); 
const sellerMedicine = require('../controllers/sellerMedicine');
// Create a new seller
router.post('/createsellers', authenticateToken,sellerController.createSeller);

// // Get all sellers
router.get('/getsellers', authenticateToken,sellerController.getAllSellers);

// // Get a specific seller by ID
router.get('/asellers/:id', sellerController.getSellerById);

// // Update a seller by ID
// router.put('/sellers/:id', sellerController.updateSellerById);

// // Delete a seller by ID
router.delete('/deletesellers/:id',authenticateToken, sellerController.deleteSeller);
//hi

router.get('/:sellerName',authenticateToken, sellerMedicine.getMedicineBySellerName);
module.exports = router;
