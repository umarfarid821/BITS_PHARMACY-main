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
        window.location.reload();
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
        <div>
            <Navbar />
        <div  className="u-chg">
        
        <div className="create-admin-container">
            <h1 className="create-admin-title">Create a New Seller</h1>
            <form className="create-admin-form" onSubmit={handleRegistrationSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registrationData.email}
                    onChange={handleRegistrationPage}
                    required
                />
                <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={registrationData.gender}
                    onChange={handleRegistrationPage}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={registrationData.username}
                    onChange={handleRegistrationPage}
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={registrationData['phoneNumber']}
                    onChange={handleRegistrationPage}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registrationData.password}
                    onChange={handleRegistrationPage}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={registrationData.address}
                    onChange={handleRegistrationPage}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={registrationData.city}
                    onChange={handleRegistrationPage}
                    required
                />  
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={registrationData.name}
                    onChange={handleRegistrationPage}
                    required
                />

                <button className="create-admin-button" type="submit" onClick={() => handleRefresh()}>Create Seller</button>
            </form>

           
        </div>
        </div>
        <div>
            <SellerList />

            </div>
</div>
    )
}

export default CreateSeller;
