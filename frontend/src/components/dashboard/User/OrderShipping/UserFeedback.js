import React, { useState } from 'react';
import './UserFeedback.css'; // Import your external CSS file
import NavBar from '../User_Navbar'; // Import the Navbar component
import axios from 'axios'; // Import the axios library
import {useNavigate} from 'react-router-dom';
const FeedbackForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the feedback data, such as sending it to a server
    const token = localStorage.getItem('token'); // Get the token
    if (!token) {
      console.error('Token not found');
      return;
    }
    const sendata = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/feedback/submit-feedback', formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            });
            console.log(response.data);
            window.alert('Feedback submitted successfully');
            setFormData({
                name: '',
                email: '',
                feedback: '',
            });
            
            navigate('/user_dashboard');
            
        }
        catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };
    sendata();

    
    // For now, let's log the data to the console
    console.log(formData);
  };

  return (
   <div>
    <NavBar />
   <div className="feedback-form-container">
   <h2>Feedback Form</h2>
   <form onSubmit={handleSubmit}>
     <label>
       Name:
       <input
         type="text"
         name="name"
         value={formData.name}
         onChange={handleChange}
         required
       />
     </label>
     <label>
       Email:
       <input
         type="email"
         name="email"
         value={formData.email}
         onChange={handleChange}
         required
       />
     </label>
     <label>
       Feedback:
       <textarea
         name="feedback"
         value={formData.feedback}
         onChange={handleChange}
         required
       />
     </label>
     <button type="submit">Submit Feedback</button>
   </form>
 </div></div>
  );
};

export default FeedbackForm;
