import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
 // Include your external responsive CSS file
import NavBar from '../Admina_Savbar';
import './style.css'; // Import your CSS file
Modal.setAppElement('#root'); // Set the root element for the modal



const CourseCard = ({ title, startDate }) => (
  
  <div className="ag-courses_item">
    <a href="#" className="ag-courses-item_link">
      <div className="ag-courses-item_bg"></div>
      <div className="ag-courses-item_title">{title}</div>
      {startDate && (
        <div className="ag-courses-item_date-box">
          Start: <span className="ag-courses-item_date">{startDate}</span>
        </div>
      )}
    </a>
  </div>
);

const CourseContainer = ({ medicines }) => (
    <div className="ag-format-container">
      <div className="ag-courses_box">
        {medicines.map((medicine) => (
          <CourseCard
             key={medicine._id}
            title={medicine.medicineName}
            startDate={medicine.expiryDate} // You can change this to whichever property you want to display as startDate
          />
        ))}
      </div>
    </div>
  );
export default CourseContainer;
