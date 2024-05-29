import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NavBar from './Admina_Savbar';
import './Feedback.css';
const FeedbackContainer = styled.div`
  margin: 20px;
  padding-left: 50px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 35%;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h5`
  margin-bottom: 10px;
`;

const CardText = styled.p`
  margin-bottom: 0;
`;

const SeeFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/feedback/getfeedback', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Feedback data:', response.data);
        setFeedbackData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchData();
  }, []);

  const deleteFeedback = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:5000/api/feedback/delete-feedback/${id}`, config);
      alert('Feedback deleted successfully');
    // refresh 
    window.location.reload();
    }
    catch (error) {
      console.error('Error deleting order:', error);
    }

  }




  return (
    <div className="custom-feedback-scroll ">
      <NavBar />
      <FeedbackContainer>
      <div className='mt-5 justify-content-center align-items-center d-flex '>
      <p className='text-center order-admin bg-light text-black'>  Welcome To Clients Messages</p>
      </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CardContainer className='d-flex justify-content-center align-items-center'>
            {feedbackData.map((feedback, index) => (
              <Card key={index}>
                <div className="card-body text-center">
                  <CardTitle>Feedback from {feedback.name}</CardTitle>
                  <CardText>
                    <strong>Email:</strong> {feedback.email}<br />
                    <strong>Subject:</strong> {feedback.subject}<br />
                    <strong>Message:</strong> {feedback.message}<br />
                    <button className="btn btn-danger btn-sm" onClick={() => deleteFeedback(feedback._id)}>Delete Feedback</button>
                      
                    

                    
                  </CardText>
                </div>
              </Card>
            ))}
          </CardContainer>
        )}
      </FeedbackContainer>
    </div>
  );
};

export default SeeFeedback;
