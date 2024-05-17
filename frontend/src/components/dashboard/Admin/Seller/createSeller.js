import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import SellerList from "./showsellers";
import Navbar from"../Admina_Savbar";
import './seller.css'; // Import your custom CSS file here

const CreateSeller= ({ }) => {
    const [registrationData, setRegistrationData] = useState({
        username: '',
        password: '',
        email: '', // Added Email and phone# fields
        phoneNumber: '',
        gender: '',
        address: '',
        city:'',
        name:'',
    })

    const handleRegistrationPage = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleRefresh = () => {
        window.location.href = '/admin/createseller';
    }
    

    // Submit Function
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:5000/api/seller/createsellers", registrationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)

            // Clear all fields after successful registration
            setRegistrationData({
                username: '',
                password: '',
                email: '',
                phoneNumber: '',
                gender: '',
                address: '',
                city:'',
                name:'',

            });
        } catch (error) {
            // Handle any errors that occur during registration, e.g., display an error message.
            console.error("Registration failed:", error);
        }
    }

    return (
        <div className="seller-scroll bg-light ">
            <Navbar />
            <div className=" seller-page-style">
            
            <div className="container mt-4 bg-light  ">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h1 className="mb-4">Create a New Seller</h1>
                <form onSubmit={handleRegistrationSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={registrationData.email}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      name="gender"
                      placeholder="Gender"
                      value={registrationData.gender}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={registrationData.username}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={registrationData.phoneNumber}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={registrationData.password}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={registrationData.address}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={registrationData.city}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={registrationData.name}
                      onChange={handleRegistrationPage}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={handleRefresh}>Create Seller</button>
                </form>
              </div>
            </div>
          </div>
            </div>
          
        <div>
           

            </div>
</div>
    )
}

export default CreateSeller;
