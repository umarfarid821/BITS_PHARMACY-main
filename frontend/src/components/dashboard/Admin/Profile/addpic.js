import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Admindashboard";
import "./AddProfile.css"; // Import your custom CSS file for styling

const { TextArea } = Input;

const AddProfile = () => {
    
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
   
    bio: "",
    photo: " ",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendRequest = async () => {
    // ... your existing 
    const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }

  const formData = new FormData();

  formData.append("bio", inputs.bio);
  formData.append("photo", inputs.photo);

  try {
    const response = await axios.post("http://localhost:5000/api/admin/addprofile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}` // Include the bearer token in the headers
      },
    });
    
    // Handle the response as needed
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/admin/profile"));
  };

  const handlePhoto = (e) => {
    setInputs({ ...inputs, photo: e.target.files[0] });
  };

  return (
    <div>
    <Navbar />
    
    <form onSubmit={handleSubmit} className="add-profile-form">
      <div className="form-container">
        <label className="form-label">Add  Bio  And Picture</label>
       

        <label className="form-label">Bio</label>
        <TextArea
          className="form-textarea"
          value={inputs.bio}
          onChange={handleChange}
          name="bio"
        />

        <label className="form-label">Image</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={handlePhoto}
        />

        <Button
        className="form-button"
        type="primary"
        htmlType="submit"
        onClick={sendRequest} // Call the sendRequest function on button click
      >
        Add 
      </Button>
      </div>
    </form>
    </div>
  );
};

export default AddProfile;
