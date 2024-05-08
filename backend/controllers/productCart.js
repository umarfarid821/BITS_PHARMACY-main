const Cart = require('../models/productCart');
const PastProductCartItems = require('../models/pastproductCart');
const AddToCart = async (req, res) => {
    try {
        const UserEmail=req.email;
        console.log(UserEmail);
        const {  Productname, Productprice, Noofproducts } = req.body;
     
        let cartItem = await Cart.findOne({ Productname });
        if (cartItem) {
            // If the item already exists in the cart, increment quantity and update total price
            cartItem.Noofproducts += 1;
            cartItem.Productprice += Productprice; // Update the total price
        } else {
            // If the item doesn't exist in the cart, create a new cart item
            cartItem = new Cart({
               
                Productname,
                Productprice,
                Noofproducts,
                UserEmail,
            });
        }
      
        await cartItem.save();

        res.status(201).json({ message: 'Medicine added to cart successfully' });
    
        // const PastProductCartItems= new PastProductCartItems({

        //     productId,
        //     Productname,
        //     Productprice,
        //     Noofproducts,
      

        // });
        // await PastProductCartItems.save();
    
    
    
    } catch (error) {
        console.error('Error while adding medicine to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
    };

const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error while fetching cart items:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const updateQuantity = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        const cartItem = await Cart.findById(cartItemId);
        if (cartItem) {
            cartItem.Noofproducts = quantity;
            // Ensure valid numeric values for price and quantity
    
      
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error while updating cart item quantity:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const RemoveCartItem =async (req,res)=>{
    const cartItemId = req.params.cartItemId;
  
    try {
      // Find the cart item by ID and remove it
      const removedCartItem = await Cart.findByIdAndRemove(cartItemId);
  
      if (!removedCartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      res.status(200).json({ message: "Cart item removed successfully" });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { 
  AddToCart,
  getCartItems ,
    updateQuantity,
    RemoveCartItem,
};
