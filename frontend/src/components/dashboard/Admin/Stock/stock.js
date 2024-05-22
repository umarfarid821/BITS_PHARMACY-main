import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Table from 'react-bootstrap/Table';
import './stock.css';
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
      const response = await axios.delete(`http://localhost:5000/api/medicine/stockmedicinedelete/${medicineId}`, {
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
        window.location.reload();
        handleModalClose();
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  return (
    <div className='bg-light  scroll-admin'>
      <NavBar />

      <div className='s-container'>
       <div className='container-stock'>
       <h2 className='text-center'>Stock Medicines Showing To Admin</h2>
       <p className='stock-style'>Total Medicines in Stock: {totalMedicinesInStock}</p>
       </div>

        {error && <pw33rs className="error">{error}</pw33rs>}

       <div className="table-responsive ">
       
       <Table  className='table table-striped table-bordered '   >
       <thead>
         <tr class="table-primary ">
           <th>Medicine Name</th>
           <th>Quantity</th>
           <th>Price</th>
           <th>Category</th>
           <th>Expiry Date</th>
           <th>Manufacturing Date</th>
           <th>Made In</th>
           <th>No of Tablets</th>
           <th >Actions</th>
           <th>Medicine Detail</th>
         </tr>
       </thead>
       <tbody>
         {medicines.map((medicine) => (
           <tr key={medicine._id}  class="table-info">
             <td>{medicine.medicineName}</td>
             <td>{medicine.adminmedicinequantity}</td>
             <td>{medicine.adminmedicineprice}</td>
             <td>{medicine.medicinecategory}</td>
             <td>{medicine.expiryDate}</td>
             <td>{medicine.manufacturingDate}</td>
             <td>{medicine.madeIn}</td>
             <td>{medicine.nooftablets}</td>
             <td className='inc-td'>
               <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(medicine)}>Update</button>
               <button className="btn btn-danger btn-sm ml-2" type="button" onClick={() => handleDelete(medicine._id)}>Delete</button>
                   </td>

                <td> <button className="btn btn-primary btn-sm " onClick={() => handleMedicineDetail(medicine.sellerName, medicine._id)}>Medicine Detail</button>
                </td>
           </tr>
         ))}
       </tbody>
     </Table>
       
       </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} contentLabel="Update Medicine">
        <h2>Update Medicine</h2>
        <form>
          <label>
            Admin Quantity:
            <input type="text" value={newAdminQuantity} onChange={(e) => setNewAdminQuantity(e.target.value)} />
          </label>
          <label>
            No of Tablets:
            <input type="text" value={newAdminnooftablets} onChange={(e) => setNewAdminnooftablets(e.target.value)} />
          </label>
          <label>
            Admin Price:
            <input type="text" value={newAdminPrice} onChange={(e) => setNewAdminPrice(e.target.value)} />
          </label>
          <button type="button" onClick={handleUpdateSubmit}>Update</button>
          <button type="button" onClick={handleModalClose}>Cancel</button>
        </form>
      </Modal>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>Medicine ID: {selectedMedicine.medicineId}</p>
            <p>Medicine Seller Name: {selectedMedicine.sellerName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockMedicine;
