const express = require('express');
const router = express.Router();
const sellerMedicine = require('../controllers/sellerMedicine');
const stockMedicine=require('../controllers/stockMedicine');
const { authenticateToken } = require('../middlewares/auth');

router.post('/addmedicine', authenticateToken, sellerMedicine.AddMedicine);
router.get('/getallmedicine',  sellerMedicine.getAllMedicines);
router.get('/getmedicine/:id', sellerMedicine.getMedicineById);

router.post('/addmedicinetostock',authenticateToken,  stockMedicine.AddMedicine);
router.get('/getallstockmedicine',  stockMedicine.getAllMedicines);
router.get('/getstockmedicine/:id', stockMedicine.getMedicineById);
router.patch('/stockmedicineupdate/:id',authenticateToken, stockMedicine.updateMedicine);

//delete route 
router.delete('/stockmedicinedelete/:id',authenticateToken, stockMedicine.deleteMedicine);


module.exports = router; // Change this line
