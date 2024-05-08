const express = require('express');
const router = express.Router();
const productCartController = require('../controllers/productCart');
const { authenticateToken } = require('../middlewares/auth');
// Add a medicine to the cart
router.post('/add-to-cart', authenticateToken, productCartController.AddToCart);

// Get all cart items
router.get('/get-cart-items', productCartController.getCartItems);

// Update quantity of a cart item
router.put('/items/:cartItemId', productCartController.updateQuantity);

// Delete a cart item
router.delete('/items/:cartItemId', productCartController.RemoveCartItem);

module.exports = router;