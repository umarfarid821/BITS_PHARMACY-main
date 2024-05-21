import React, { useEffect, useState } from "react";
import axios from "axios";
import './showseller.css';
import {useNavigate} from 'react-router-dom';
const SellerList = () => {
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
        const response = await axios.get("http://localhost:5000/api/seller/getsellers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      await axios.delete(`http://localhost:5000/api/seller/deletesellers/${adminId}`, {
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
  const CreateSellerComponent = () => {
    navigate('/admin/createsellercomponent');
  };

  const handleShow = async (adminId) => {
    
    console.log(adminId);
    navigate(`/admin/showadminseller/${adminId}`);
  };
  return (
    <div className="container mt-4  showseller-pad">
  <h1>Sellers List To Admin</h1>
  <button type="button" className="btn btn-dark" onClick={CreateSellerComponent} >Create New Seller</button>
  <table className="table table-striped table-bordered">
    <thead className="thead-dark">
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

    {admins.length > 0 ? (


      admins.map((admin) => (
        <tr key={admin._id}>
          <td>{admin.username}</td>
          <td>{admin.email}</td>
          <td>{admin.phoneNumber}</td>
          <td>{admin.address}</td>
          <td>{admin.gender}</td>
          <td>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(admin._id)}>Delete</button>
            <button className="btn btn-primary btn-sm ml-2" onClick={() => handleShow(admin._id)}>Show</button>
          </td>
        </tr>
      )) ): (
        <tr>
          <td colSpan="8" className="text-center">NO Seller Here</td>
        </tr>
      )}
    
    
  
    </tbody>
  </table>
</div>

  );
};

export default SellerList;
