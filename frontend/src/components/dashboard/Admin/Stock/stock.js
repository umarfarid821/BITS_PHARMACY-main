import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './stock.css'; // Include your external responsive CSS file
import NavBar from '../Admina_Savbar';
import CourseContainer from './s';
Modal.setAppElement('#root'); // Set the root element for the modal

const StockMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdminQuantity, setNewAdminQuantity] = useState('');
  const [newAdminPrice, setNewAdminPrice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newAdminnooftablets, setNewAdminnooftablets] = useState('');
  useEffect(() => {
    const fetchStockMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medicine/getallstockmedicine');
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching stock medicines:', error);
        setError('Failed to fetch stock medicines. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStockMedicines();
  }, []);

  const totalMedicinesInStock = medicines.length;

  const handleUpdate = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
    setNewAdminQuantity('');
    setNewAdminPrice('');
  };
  const handleDelete = async (medicineId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
     
    const response=  await axios.delete(`http://localhost:5000/api/medicine/stockmedicinedelete/${medicineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
          window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleMedicineDetail = (sellerName, medicineId) => {
    setSelectedMedicine({ sellerName, medicineId });

   setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/medicine/stockmedicineupdate/${selectedMedicine._id}`,
        {
          adminmedicinequantity: newAdminQuantity,
          adminmedicineprice: newAdminPrice,
          nooftablets: newAdminnooftablets,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update successful, refresh the medicine list
        // fetchStockMedicines();
        window.location.reload();
        handleModalClose();
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
      // Handle error updating medicine
    }
  };
  

  return (
    <div>
      <NavBar />

      

      <div className="medicine-container  ">
        <h2>Stock Medicines</h2>
        <p>Total Medicines in Stock: {totalMedicinesInStock}</p>
        <div className="medicine-list ">
          {medicines.map((medicine) => (
            
            <div key={medicine._id} className="medicine-card ">
           
              <h3>Medicine Name: {medicine.medicineName}</h3>
              
              <p>Quantity: {medicine.adminmedicinequantity}</p>
              <p>Price: {medicine.adminmedicineprice}</p>
              <p>Category: {medicine.medicinecategory}</p>
              <p>Expiry Date: {medicine.expiryDate}</p>
              <p>Manufacturing Date: {medicine.manufacturingDate}</p>
              <p>Made In: {medicine.madeIn}</p>
              <p>No of Tablets: {medicine.nooftablets}</p>
              
              <button  className='Update' 
              onClick={() => handleUpdate(medicine)}>Update</button>
              <button  className='Delete' type="button" onClick={()=>handleDelete(medicine._id)}>
              Delete
            </button>
            <button  className='MedicineDetail'onClick={() => handleMedicineDetail(medicine.sellerName, medicine._id)}>Medicine Detail</button>
            </div>
          ))}
        </div>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Modal for Update Form */}
     <div className='modal-div'>
     <Modal
     isOpen={isModalOpen}
     onRequestClose={handleModalClose}
     contentLabel="Update Medicine"
   >
     <h2>Update Medicine</h2>
     <form className='modal-size'>
       <label>
         Admin Quantity:
         <input
           type="text"
           value={newAdminQuantity}
           onChange={(e) => setNewAdminQuantity(e.target.value)}
         />
       </label>
       <label>
       No of Tablets:
       <input
         type="text"
         value={newAdminnooftablets}
         onChange={(e) => setNewAdminnooftablets(e.target.value)}
       />
     </label>
       <label>
         Admin Price:
         <input
           type="text"
           value={newAdminPrice}
           onChange={(e) => setNewAdminPrice(e.target.value)}
         />
       </label>
       <button type="button" onClick={handleUpdateSubmit}>
         Update
       </button>
       <button type="button" onClick={handleModalClose}>
         Cancel
       </button>
      
     </form>
   </Modal></div>

   {modalOpen && (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>&times;</span>
        <p className='med'>Medicine ID: {selectedMedicine.medicineId}</p>
        <p className='med'>Medicine Seller Name: {selectedMedicine.sellerName}</p>
      </div>
    </div>
  )}
    </div>
  );
};

export default StockMedicine;
