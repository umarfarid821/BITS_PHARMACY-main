import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './loginstyle.css';
import { useNavigate } from 'react-router-dom';
const RegistrationForm = ({ setToken }) => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState({
        username: '',
        password: '',
        email: '', // Added Email and phone# fields
        phoneNumber: '',
        gender:'',
    })

    const handleRegistrationPage = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        navigate('/');
      }; 

    // Submit Function 
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', registrationData)
            console.log(response.data)
            setToken(response.data.token);
          
            // Clear all fields after successful registration
            setRegistrationData({
                username: '',
                password: '',
                email: '',
                phoneNumber: '',
                gender:'',
            });
            navigate('/');

        
        } catch (error) {
            // Handle any errors that occur during registration, e.g., display an error message.
            console.error("Registration failed:", error);
        }
    }
  return (
    <div className="wrapper1">
      <nav className="nav">
        <div className="nav-logo">
          <p>LOGO .</p>
        </div>
        <div className="nav-menu" id="navMenu">
          <ul>
            <li><a href="#" className="link active">Home</a></li>
            <li><a href="#" className="link">Blog</a></li>
            <li><a href="#" className="link">Services</a></li>
            <li><a href="#" className="link">About</a></li>
          </ul>
        </div>
        <div className="nav-button">
          <button className="btn">Sign Up</button>
          <button  onClick={handleLogin}  className="btn">Sign In</button>
        </div>
        <div className="nav-menu-btn">
          <i className="bx bx-menu"></i>
        </div>
      </nav>

      <div className="form-box">
        <div className="register-container" id="register">
          <div className="top">
            <span onClick={handleLogin}>Have an account? <a >Login</a></span>
            <header>Sign Up</header>
          </div>
          <div className="two-forms">
            <div className="input-box">
            
            <input className=" input-field"
            type="email" // Changed to "email" for the Email input type
            name="email"
            placeholder="email"
            value={registrationData.email}
            onChange={handleRegistrationPage}
            required
        />
            
            <i className="bx bx-user"></i>
            </div>
            <div className="input-box">
            
            <select
            className="input-field input "
            name="gender"
            value={registrationData.gender}
            onChange={handleRegistrationPage}
            required
          >
            <option      value=""> Gender</option>
            <option  value="male">Male</option>
            <option   value="female">Female</option>
            <option value="other">Other</option>
          </select>
            
            
            <i className="bx bx-user"></i>
            </div>
          </div>
          <div className="input-box">
          <input className="input-field"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={registrationData.username}
                    onChange={handleRegistrationPage}
                    required
                />
          
          <i className="bx bx-envelope"></i>
          </div>
          <div className="input-box">
           
          <input className=" input-field"
          type="password"
          name="password"
          placeholder="password"
          value={registrationData.password}
          onChange={handleRegistrationPage}
          required
      />
          <i className="bx bx-lock-alt"></i>
          </div>


          <div className="input-box">
           
          <input className=" input-field"
          type="text" // Changed to "text" for the phone# input type
          name="phoneNumber"
          placeholder="phoneNumber"
          value={registrationData['phoneNumber']}
          onChange={handleRegistrationPage}
          required
      />
          <i className="bx bx-lock-alt"></i>
          </div>

     


          <div className="input-box">
            <input type="submit" className="submit" value="Register"  onClick={handleRegistrationSubmit}/>
          </div>
          <div className="two-col">
            <div className="one">
              <input type="checkbox" id="register-check" />
              <label htmlFor="register-check"> Remember Me</label>
            </div>
            <div className="two">
              <label><a href="#">Terms & conditions</a></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
