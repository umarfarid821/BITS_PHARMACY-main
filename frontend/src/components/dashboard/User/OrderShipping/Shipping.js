import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../User_Navbar";

import  { useNavigate } from "react-router-dom";
import "./Shipping.css";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cart items and total amount from the server
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/get-cart-items");
        console.log("Cart Data:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setCartItems(response.data);
          // Calculate total amount based on cart items
          const total = response.data.reduce((total, item) => total + item.Productprice * item.Noofproducts, 0);
          setTotalAmount(total);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };


  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
    
      const token = localStorage.getItem('token'); // Get the token
        if (!token) {
            console.error('Token not found');
            return;
        }
            
      // Place the order and delete cart items
      const placeOrderResponse = await axios.post(
        `http://localhost:5000/api/order/place-order`,{shippingAddress,
        paymentMethod,
        cartItems,
        totalAmount,},{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      console.log('Order Placed:', placeOrderResponse.data);

    const orderData = {
        shippingAddress,
        paymentMethod,
        cartItems,
        totalAmount,
        };

    //   const orderResponse = await axios.post(
    //     'http://localhost:5000/api/order/',
    //     orderData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log('Order Data Sent:', orderResponse.data);
   
      navigate('/user_dashboard');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Error placing order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handlePlaceCart = async () => {
   
   
    // const token = localStorage.getItem('token'); // Get the token
    // if (token) {
    //   const decodedToken = jwtDecode(token);
    //   const userId = decodedToken.userId; // Extract user ID from the token
    //   await axios.post(`http://localhost:5000/api/cart/place-order/${userId}`);



        // Call the place order route on the backend with the user ID
     
        // Navigate to the user's cart page or any other appropriate page
        navigate('/user/cart');
      
  };
  
  
  
  return (
   <div>
    <Navbar />
   <div className="checkout-container">
      
   <h2>Checkout</h2>

   <div className="shipping-address">
     <h3>Shipping Address</h3>
     <input type="text" name="name" placeholder="Full Name" onChange={handleAddressChange} />
     <input type="text" name="address" placeholder="Address" onChange={handleAddressChange} />
     <input type="text" name="city" placeholder="City" onChange={handleAddressChange} />
     <input type="text" name="state" placeholder="State" onChange={handleAddressChange} />
     <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleAddressChange} />
   </div>
   <div className="payment-method">
     <h3>Select Payment Method</h3>
     <select value={paymentMethod} onChange={handlePaymentMethodChange}>
       <option value="">Select Payment Method</option>
       <option value="creditCard">Credit Card</option>
       <option value="paypal">PayPal</option>
     </select>
   </div>
   <div className="order-summary">
     <h3>Order Summary</h3>
     <ul>
       {cartItems.map((item) => (
         <li key={item._id}>
           {item.name} - Quantity: {item.Noofproducts}
         </li>
       ))}
     </ul>
     <p>Total Amount: ${totalAmount.toFixed(2)}</p>
   </div>
   <button onClick={handlePlaceOrder}>Place Order  </button>
   <button onClick={handlePlaceCart}>Back to Cart</button>
 </div></div>
  );
};

export default CheckoutPage;
