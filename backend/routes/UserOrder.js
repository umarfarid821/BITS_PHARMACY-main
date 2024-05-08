const UserOrder= require('../controllers/UserOrder');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
// Place an order
router.post('/place-order', authenticateToken, UserOrder.AddToOrder);
// Get all orders
router.get('/AdminOrder', authenticateToken, UserOrder.getOrder);
// Get a specific order
router.get('/UserOrder', authenticateToken, UserOrder.getOrderByEmail);
module.exports = router;