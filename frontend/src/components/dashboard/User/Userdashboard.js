import React from 'react';
import Img3 from './images/3.jpg';
import Navbar from './User_Navbar';
import Hero from './images/hero_1.jpg';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
const LandingPage = () => {
  const UserStockMedicine = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/user/stockmedicines';
  };
  return (
    <div>
      <Navbar />
      <div className="site-blocks-cover my " >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
              <div className="site-block-cover-content text-center">
                <h2 className="sub-title fix">Effective Medicine, Fast Delivery Service </h2>
                <h1 className=''>Welcome To Bits Pharmacy </h1>
                <p>
                 <Button onClick={UserStockMedicine} > Shop</Button>                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
