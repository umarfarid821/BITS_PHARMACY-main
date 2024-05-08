import React, { useEffect, useState } from "react";
import axios from "axios";
import './showseller.css';
import {useNavigate} from 'react-router-dom';
const WorkerList = () => {
    const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  
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
      await axios.delete(`http://localhost:5000/api/deliveryWorker/deletesellers/${adminId}`, {
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

  const handleShow = async (adminId) => {
    
   
    navigate(`/admin/showadminseller/${adminId}`);
  };
  return (
    <div className="pad">
      <h1>Sellers List</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>{admin.phoneNumber}</td>
              <td>{admin.address}</td>
              <td>{admin.gender}</td>
              <td>
                
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerList;
