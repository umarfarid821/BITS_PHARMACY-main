import React, { useEffect, useState } from "react";
import axios from "axios";
import './showadmin.css';
import Table from 'react-bootstrap/Table';
const AdminList = () => {
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
        const response = await axios.get("http://localhost:5000/api/admin/alladmin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmins(response.data); // Assuming the API returns an array of admin objects
      } catch (error) {
        console.error("Error fetching admins:", error);
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
      await axios.delete(`http://localhost:5000/api/admin/${adminId}`, {
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

  return (
    <div className="" >
      
     <div className="admin-list-pd" >
     
     
     <Table className="table table-striped table-bordered " >
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
             <button  className="btn-danger btn-sm" onClick={() => handleDelete(admin._id)}>Delete</button>
           </td>
         </tr>
       ))
      
      ) : (
        <tr>
          <td colSpan="8" className="text-center">No Admin Here</td>
        </tr>
      )
      
      }



     </tbody>
   </Table></div>
    </div>
  );
};

export default AdminList;
