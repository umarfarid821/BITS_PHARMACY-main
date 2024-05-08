import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./getprofile.css"; // Import the custom CSS file
import { Link } from "react-router-dom";

const ShowProfile = () => {
    
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/showprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error:", error);
        // Handle error, navigate to an error page or show an error message
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div>
  
    <div className="show-profile-container">
      <div className="profile-card">
        <h1>Your Profile</h1>
       
        <p>Bio: {profile.bio}</p>
        <img
          className="profile-image"
          src={`http://localhost:5000/uploads/${profile.photo}`}
          alt="Profile"
        />

        <button className="edit-button" onClick={() => navigate("/admin/editprofile")}>
          Edit Profile
        </button>
      </div>
    </div>
    </div>
  );
};

export default ShowProfile;
