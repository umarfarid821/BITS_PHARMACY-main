// MedicineCard.js

import React from 'react';
import './Medicine.css';
const MedicineCard = ({ medicine, index, handleSubmit, quantities, setQuantities, prices, setPrices, nooftablet, setNooftablets, loading, error }) => {
  return (
    <div className='medicine-list'>
    <li  className="medicine-card"   key={medicine._id}>
    <h3> {medicine.medicinename}</h3>

    <p>Category: {medicine.medicinecategory}</p>
    <p>Expiry Date: {medicine.expiryDate}</p>
    <p>Manufacturing Date: {medicine.manufacturingDate}</p>
    <p>Made In: {medicine.madeIn}</p>
    <p>Price: {medicine.adminmedicineprice}</p>
    <p>Quantity: {medicine.adminmedicinequantity}</p>
    <p>No of Tablets: {medicine.adminnooftablets}</p>
    <p>Seller Name: {medicine.sellername}</p>
    <p>Medicine ID: {medicine.medicineId}</p>
    <p>Medicine Description: {medicine.medicinedescription}</p>
    

      <div className='card-body'>
        <form onSubmit={(e) => handleSubmit(e, index)}>
          <label>
            Quantity:
            <input
              type="number"
              value={quantities[index]}
              onChange={(e) => setQuantities([...quantities.slice(0, index), parseInt(e.target.value, 10), ...quantities.slice(index + 1)])}
              required
            />
          </label>
          <label>
            No of Tablets:
            <input
              type="number"
              value={nooftablet[index]}
              onChange={(e) => setNooftablets([...nooftablet.slice(0, index), parseInt(e.target.value), ...nooftablet.slice(index + 1)])}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={prices[index]}
              onChange={(e) => setPrices([...prices.slice(0, index), parseFloat(e.target.value), ...prices.slice(index + 1)])}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add to Stock'}
          </button>
        </form>
      </div>
    </li>
    
    </div>
  );
};

export default MedicineCard;
