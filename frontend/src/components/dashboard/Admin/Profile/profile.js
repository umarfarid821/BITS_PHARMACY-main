import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Admina_Savbar';
import ShowProfile from './showpic';

  
const Profile = () => {

  
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
    <Navbar />
    <div className="profile-container">
      <div className="profile-content">
      <h2 className="highlight">Welcome : {user.email}!</h2>
      <h2>Address: {user.address}</h2>
        <h2>Phone Number: {user.phoneNumber}</h2>
        <h2>Username: {user.username}</h2>
        <h2>Role: {user.role}</h2>
        <h2>Gender: {user.gender}</h2>
        <h2>Timestamp: {user.timestamp}</h2>
      </div>
      <div className="profile-box">
        
        <button onClick={handleProfile}>Add Profile</button>
      </div>
      <ShowProfile />
    </div>
    </div>
  );
  
};

export default Profile;
