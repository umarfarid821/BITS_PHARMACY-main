import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./editprofile.css"; 
import Navbar from "../Admindashboard";
// Import your custom CSS file for styling
import { Link } from "react-router-dom";
const EditProfile = () => {
    
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    
    bio: "",
    photo: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/showprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { username, bio } = response.data;
        setInputs({ username, bio });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoto = (e) => {
    setInputs({ ...inputs, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    
    formData.append("bio", inputs.bio);
    if (inputs.photo) {
      formData.append("photo", inputs.photo);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/admin/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      navigate("/admin/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
    <Navbar />
    
    <form onSubmit={handleSubmit}>
      <div className="form-container">
       

        <label>Bio</label>
        <textarea
          value={inputs.bio}
          onChange={handleChange}
          name="bio"
        />

        <label>Profile Picture</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={handlePhoto}
        />

        <button type="submit" >Save Changes</button>
      </div>
    </form>
    </div>
  );
};

export default EditProfile;
