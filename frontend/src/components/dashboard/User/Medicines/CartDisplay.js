import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CartDisplay.css";
import NavBar from "../User_Navbar";
import Footer from "../Footer";
const CartDisplay = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/get-cart-items");
        if (response.data && Array.isArray(response.data)) {
          setCartItems(response.data);
        } else {
          console.error("Invalid cart items data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      const numericQuantity = parseFloat(newQuantity);
      if (!isNaN(numericQuantity)) {
        const response = await axios.put(`http://localhost:5000/api/cart/items/${cartItemId}`, {
          quantity: numericQuantity,
        });

        const updatedCartItem = response.data;
        console.log("updatedCartItem", updatedCartItem);
        setCartItems((prevCartItems) =>
          prevCartItems.map((cartItem) =>
            cartItem._id === cartItemId ? { ...cartItem, Noofproducts: newQuantity } : cartItem
          )
        );
      } else {
        console.error("Invalid quantity input:", newQuantity);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleAddProduct = () => {
    navigate('/user/stockmedicines');
  };
  const handlePastProduct = () => {
    navigate('/user/pastorders');
  };

  const handleRemoveProduct = async (cartItemId) => {
    console.log("cartItemId", cartItemId);
    try {
      await axios.delete(`http://localhost:5000/api/cart/items/${cartItemId}`);
      setCartItems((prevCartItems) => prevCartItems.filter((cartItem) => cartItem._id !== cartItemId));
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };


  const handleProceed = () => {
    // Calculate total price and product quantities
    const totalPrice = cartItems.reduce((total, cartItem) => total + cartItem.Productprice * cartItem.Noofproducts, 0);
    const productQuantities = cartItems.map((cartItem) => `${cartItem.Productname}: ${cartItem.Noofproducts}`).join(", ");
    
    // Display the checkout message
    const checkoutMessage = `Total Price: ${totalPrice}\nNumber of Products: ${cartItems.length}\nProduct Quantities: ${productQuantities}`;
    alert(checkoutMessage);
  
    // Navigate to the Shipping.js page
    
    navigate("/user/shipping");
  };
  
  return (
    <div className="scroll-cart">
    <NavBar />
    <div className="cart-container">
      <nav className="navbar">
        <div className="navbar-title">Your Online BitsStore</div>
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add More Products
        </button>
        <button className="add-product-btn" onClick={handlePastProduct}>
        See Past Order
        </button>
      </nav>
      <h2>Cart Items</h2>
      <ul className="cart-list">
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <li key={cartItem._id} className="cart-item">
          <div className="cart-item-details">
            <p className="product-name">Product: {cartItem.Productname}</p>
            <p className="product-price">Price: {cartItem.Productprice}</p>
            <div className="product-quantity">
              Quantity: {cartItem.Noofproducts}
              <button onClick={() => handleQuantityChange(cartItem._id, cartItem.Noofproducts + 1)}>+</button>
              <button onClick={() => handleQuantityChange(cartItem._id, cartItem.Noofproducts - 1)}>-</button>
            </div>
            <p className="total-price">Total Price: {cartItem.Productprice * cartItem.Noofproducts}</p>
            <button className="remove-product-btn" onClick={() => handleRemoveProduct(cartItem._id)}>
              Remove from Cart
            </button>
          </div>
        </li>
        ))
      ) : (
        <p>No items in the cart</p>
      )}
    </ul>
    
      <nav className="navbar">
        <button className="add-product-btn" onClick={handleProceed}>
          Proceed to Checkout
        </button>
      </nav>
    </div>
    
    
   <div className="pt-5">
      <Footer />

      </div>


    
    
    </div>
  );
};

export default CartDisplay;
