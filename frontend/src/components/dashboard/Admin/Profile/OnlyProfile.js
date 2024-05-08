import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Admina_Savbar';
import ShowProfile from './showpic';

import './by.css'; // Assuming you have the styles in a separate CSS file
import img from  './profile.png';
const UserProfileCard = () => {

    
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log(token);
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        console.log(token);
        setUser(response.data);
        
      } catch (error) {
        setError('Unable to fetch profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setError('Invalid token. Please log in again.');
      setLoading(false);
    }
  }, []);

 

  const handleEdit= async () => {
   
   navigate('/admin/editprofile');
  };
  
  const handleProfile= async () => {
   
    navigate('/admin/addprofile');
   };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

    return (
       <div>
       
       <Navbar/>
       
       <div className="wrapper">
       <div className="left">
           <img src={img} alt="user" width="100" />
           <h4>{user.username}</h4>
           <p>{user.role}</p>
       </div>
       <div className="right">
           <div className="info">
               <h3>Information</h3>
               <div className="info_data">
                   <div className="data">
                       <h4>Email</h4>
                       <p>{user.email}</p>
                   </div>
                   <div className="data">
                       <h4>Phone</h4>
                       <p>{user.phoneNumber}</p>
                   </div>
                   
               </div>
              
           </div>

           <div className="projects">
               <h3>Description</h3>
               <div className="projects_data">
                   <div className="data">
                       <h4>Gender</h4>
                       <p>{user.gender}</p>
                   </div>
                   <div className="data">
                       <h4>Date</h4>
                       <p>{user.timestamp}.</p>
                   </div>
               </div>
               <br></br>
               <div className="projects_data">
               <div className="data">
                   <h4>Role</h4>
                   <p>{user.role}</p>
               </div>
               <div className="data">
                   <h4>Address</h4>
                   
                   <p>{user.address}.</p>
               </div>
           </div>
           </div>

  
       </div>
   </div>
       </div>
    );
};

export default UserProfileCard;
