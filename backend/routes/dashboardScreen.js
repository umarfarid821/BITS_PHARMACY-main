const express = require('express');
const router = express.Router();
const totalController = require('../controllers/dashboardScreen');
const { authenticateToken } = require('../middlewares/auth'); 



// Create a new total
router.post('/total', authenticateToken, totalController.createTotal);

// update  
router.put('/updatetotal', authenticateToken, totalController.updateTotal);

//get total
router.get('/gettotal', authenticateToken, totalController.getTotal);

// get recent 
router.get('/getrecentorders', authenticateToken, totalController.getRecentOrders);

//5 prod sales
router.get('/get5productsales', authenticateToken, totalController.getTop5ProductSales);

router.get('/getProfile', authenticateToken, totalController.getProfile);


module.exports = router;
