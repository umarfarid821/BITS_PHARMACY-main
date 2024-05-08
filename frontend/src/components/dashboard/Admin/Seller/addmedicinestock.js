// AddMedicineToStock.js

import React, { useState , useParams} from 'react';
import axios from 'axios';
import './Stock.css'; // Import your external CSS file
import LandingPage from '../Admindashboard';
import AllMedicinesCart from './getmedicine';
const AddMedicineToStock = () => {
  const [medicineNames, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const [price, setPrice] = useState(0);
    // accept medicine id and name 
     const { medicineId, medicineName } = useParams();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
   
  };
  const handleIncrementP = () => {
   
    setPrice(price + 1);
  };

  const handleDecrement = () => {
    // Ensure quantity does not go below 0
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    
  };
  const handleDecrementP = () => {
    // Ensure quantity does not go below 0
    
    if (price > 0) {
      setPrice(price - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/stock/add', {
        medicineName,
        quantity,
        price,
      });

      if (response.status === 201) {
        console.log('Medicine added to stock successfully');
        setMedicineName('');
        setQuantity(0);
        setPrice(0);
        window.alert('Medicine added to stock successfully!');
      }
    } catch (error) {
      console.error('Add to stock error:', error);
      setError('Failed to add medicine to stock. Please try again.');
      window.alert('Failed to add medicine to stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div>
    <div>

    <LandingPage/>
    </div>
<div>

<div className="add-medicine-card">
<div className="card-header">
  <h2>Add Medicine to Stock</h2>
</div>
<div className="card-body">
  <form onSubmit={handleSubmit}>
    <label>
      Medicine Name:
      <input
        type="text"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        required
      />
    </label>
    <label>
      Quantity:
      <div className="quantity-input">
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          required
        />
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>
    </label>
    <label>
    Price Inc:
    <div className="quantity-input">
      <button type="button" onClick={handleDecrementP}>
        -
      </button>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        required
      />
      <button type="button" onClick={handleIncrementP}>
        +
      </button>
    </div>
  </label>
    {error && <p className="error">{error}</p>}
    <button type="submit" disabled={loading}>
      {loading ? 'Adding...' : 'Add to Stock'}
    </button>
  </form>
</div>
</div>
</div>

</div>
   
  );
};

export default AddMedicineToStock;
