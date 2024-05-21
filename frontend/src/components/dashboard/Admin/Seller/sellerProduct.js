import React, { useState } from 'react';
import axios from 'axios';
import './sellerProduct.css'; // Import your external CSS file
const SellerProductsForm = ({ sellerName }) => {
  console.log('Seller name:', sellerName);
  const [medicinename, setMedicineName] = useState('');
  const [medicinecategory, setMedicineCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [madeIn, setMadeIn] = useState('');
  const [price, setPrice] = useState('');
  const [specification, setSpecification] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // Make a POST request to add a product
      await axios.post('http://localhost:5000/api/medicine/addmedicine', {
        medicinename,
        medicinecategory,
        expiryDate,
        manufacturingDate,
        madeIn,
        price,
        sellername: sellerName, // Assuming sellerName is passed as a prop
        specification,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      // You may want to update the state or show a success message
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, show error message, etc.
    }
  };
  const handleRefresh = () => {
    window.location.reload();
}
return (
  <div className="SellerProductsForm  mt-4 ">
  <h2 className="mb-4">Add  Product</h2>
  <form onSubmit={handleAddProduct}>
    <div className="mb-3">
      <label className="form-label">
        Medicine Name:
        <input type="text" className="form-control" value={medicinename} onChange={(e) => setMedicineName(e.target.value)} required />
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">
        Medicine Category:
        <input type="text" className="form-control" value={medicinecategory} onChange={(e) => setMedicineCategory(e.target.value)} required />
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">
        Expiry Date:
        <input type="text" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">
        Manufacturing Date:
        <input type="text" className="form-control" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} required />
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">
        Made In:
        <input type="text" className="form-control" value={madeIn} onChange={(e) => setMadeIn(e.target.value)} required />
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">
        Price:
        <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">
        Specification:
        <input type="text" className="form-control" value={specification} onChange={(e) => setSpecification(e.target.value)} required />
      </label>
      <button type="submit" className="btn btn-primary" onClick={() => handleRefresh()}>Add Product</button>

    </div>

    </form>
</div>

);
};

export default SellerProductsForm;
