import React, { useEffect, useState } from "react";
import axios from "axios";
import './showseller.css';
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";
const WorkerList = () => {
    const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  
  useEffect(() => {
    // Fetch the list of admins from your backend API with the token
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/deliveryWorker/getdeliveryworkers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        console.log(response.data);
        setAdmins(response.data); // Assuming the API returns an array of admin objects
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (adminId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Make a DELETE request to your API to delete the admin by ID
      await axios.delete(`http://localhost:5000/api/deliveryWorker/deletedeliveryworkers/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted admin from the local state
      setAdmins(admins.filter((admin) => admin._id !== adminId));

    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };


  const ChangeMedicineStatus = async (orderId) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/deliveryWorker/updatestatus/${orderId}`,{ status: selectedStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };
const NewWorker = async () => {

  navigate('/admin/newworker');
};

  
  return (
    <div className="pad bg-light custom-scroll-worker">
    <h1 className="text-center">Workers List To Admin</h1>
    <Button className=" btn-secondary btn-style" onClick={NewWorker}  > Create New Worker</Button>
    <Table bordere strd hover variant="dark">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Gender</th>
          <th>Assigned Medicines</th>
          <th>Delete Worker</th>
          <th>Actions Admin</th>
        </tr>
      </thead>
      <tbody>
      {admins.length > 0 ? (
        admins.map((admin, index) => (
          <tr key={admin._id}>
            <td>{admin.username}</td>
            <td>{admin.email}</td>
            <td>{admin.phoneNumber}</td>
            <td>{admin.address}</td>
            <td>{admin.gender}</td>
            <td>{admin.assignedMedicine}</td>
            <td>
              <Button className="btn-danger btn-sm"  onClick={() => handleDelete(admin._id)}>Delete Worker</Button>
            </td>
            <td>
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option >Select status</option>
                  <option value="Order Delivered">Order Delivered</option>
                  <option value="Order Returned">Order Returned</option>
                </select>
                <button
                className="btn-sm"
                  onClick={() => ChangeMedicineStatus(admin.assignedMedicine)}
                >
                  Change Order Status
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center">No workers available</td>
        </tr>
      )}
    </tbody>
    </Table>
  </div>
  );
};

export default WorkerList;
