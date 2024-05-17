import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AdminList from "./Showadmin";
import Navbar from"../Admina_Savbar";
import './CreateAdmin.css';
const CreateAdmin = () => {
    const [registrationData, setRegistrationData] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        gender: '',
        address: '',
    })

    const handleRegistrationPage = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Submit Function
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:5000/api/admin/addadmin", registrationData, {
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
            });
        } catch (error) {
            // Handle any errors that occur during registration, e.g., display an error message.
            console.error("Registration failed:", error);
        }
    }

    return (
        <div className="bg-light cd">
            <Navbar />
            <div className="create">
            
            <div className="container mt-4">
                <h1>Create a New Admin</h1>
                <form onSubmit={handleRegistrationSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={registrationData.email}
                            onChange={handleRegistrationPage}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="gender"
                            placeholder="Gender"
                            value={registrationData.gender}
                            onChange={handleRegistrationPage}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            value={registrationData.username}
                            onChange={handleRegistrationPage}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={registrationData.phoneNumber}
                            onChange={handleRegistrationPage}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={registrationData.password}
                            onChange={handleRegistrationPage}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Address"
                            value={registrationData.address}
                            onChange={handleRegistrationPage}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Create Admin</button>
                </form>
            </div></div>
        </div>
    )
}

export default CreateAdmin;
