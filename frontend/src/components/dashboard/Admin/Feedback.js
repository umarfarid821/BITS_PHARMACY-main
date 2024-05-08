import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NavBar from './Admina_Savbar';

const FeedbackContainer = styled.div`
  margin: 20px;
  padding-left: 250px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 300px;
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
        setFeedbackData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <FeedbackContainer>
        <h2>Feedback</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CardContainer>
            {feedbackData.map((feedback, index) => (
              <Card key={index}>
                <div className="card-body">
                  <CardTitle>Feedback from {feedback.name}</CardTitle>
                  <CardText>
                    <strong>Email:</strong> {feedback.email}<br />
                    <strong>Feedback:</strong> {feedback.feedback}
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
