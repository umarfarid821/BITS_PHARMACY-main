import { useState } from "react";
import axios from 'axios';
import WorkerList from "./ShowWorker";
import Navbar from "../Admina_Savbar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './seller.css'; // Import your custom CSS file here

const CreateDeliveryWorker = () => {
    const [registrationData, setRegistrationData] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        gender: '',
        address: '',
        city: '',
        name: '',
    })

    const handleRegistrationPage = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleRefresh = () => {
        window.location.reload();
    }

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

            setRegistrationData({
                username: '',
                password: '',
                email: '',
                phoneNumber: '',
                gender: '',
                address: '',
                city: '',
                name: '',
            });
        } catch (error) {
            console.error("Registration failed:", error);
        }
    }

    return (
        <div className="bg-secondary  de-wk">
            <Navbar />
            <div className="create-admin-container">
                <h1 className="create-admin-title">Create a New Worker</h1>
                <Form className="create-admin-form" onSubmit={handleRegistrationSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={registrationData.email} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" placeholder="Gender" name="gender" value={registrationData.gender} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" name="username" value={registrationData.username} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Phone Number" name="phoneNumber" value={registrationData.phoneNumber} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={registrationData.password} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" name="address" value={registrationData.address} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" name="city" value={registrationData.city} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" name="name" value={registrationData.name} onChange={handleRegistrationPage} required />
                    </Form.Group>

                    <Button className="create-admin-button" variant="primary" type="submit">Create Delivery Worker</Button>
                </Form>
            </div>
            
        </div>
    )
}

export default CreateDeliveryWorker;
