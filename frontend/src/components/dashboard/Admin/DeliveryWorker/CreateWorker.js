import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import WorkerList from "./ShowWorker";
import Navbar from"../Admina_Savbar";
import './seller.css'; // Import your custom CSS file here

const CreateDeliveryWorker= ({ }) => {
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
            console.log(registrationData)
                        const response = await axios.post("http://localhost:5000/api/deliveryWorker/createdeliveryworkers", registrationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            alert("Worker Created Successfully");
            handleRefresh();

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
        
        <div>
            <WorkerList />

            </div>
</div>
    )
}

export default CreateDeliveryWorker;
