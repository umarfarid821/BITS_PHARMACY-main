import React, { useState } from 'react';
import './UserFeedback.css'; // Import your external CSS file
import NavBar from '../User_Navbar'; // Import the Navbar component
import axios from 'axios'; // Import the axios library
import { useNavigate } from 'react-router-dom';
import OfficesSection from './OfficeSetion';
import Footer from '../Footer';
const FeedbackForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    c_fname: '',
    c_lname: '',
    c_email: '',
    c_subject: '',
    c_message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/feedback/submit-feedback',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      window.alert('Feedback submitted successfully');
      setFormData({
        c_fname: '',
        c_lname: '',
        c_email: '',
        c_subject: '',
        c_message: '',
      });
      navigate('/user_dashboard');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className='scroll-fb'>
      <NavBar />
      <div className="site-section ufb bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-5 text-black">Get In Touch</h2>
            </div>
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                        value={formData.c_fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_lname" className="text-black">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_lname"
                        name="c_lname"
                        value={formData.c_lname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_email" className="text-black">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="c_email"
                        name="c_email"
                        value={formData.c_email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_subject" className="text-black">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_subject"
                        name="c_subject"
                        value={formData.c_subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_message" className="text-black">
                        Message
                      </label>
                      <textarea
                        name="c_message"
                        id="c_message"
                        cols="30"
                        rows="7"
                        className="form-control"
                        value={formData.c_message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        value="Send Message"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='ufb fb-color'>
      
      <OfficesSection />
      </div>
     <div >
     <   Footer />

     
     </div>


    </div>
    
  );
};

export default FeedbackForm;
