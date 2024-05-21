import React from 'react';
import './OfficeSection.css';
const OfficesSection = () => {
  return (
    <div className="site-section  os ">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-white mb-4">Offices</h2>
          </div>
          <div className="col-lg-4">
            <div className="p-4 bg-white mb-3 rounded">
              <span className="d-block text-black h6 text-uppercase">New York</span>
              <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="p-4 bg-white mb-3 rounded">
              <span className="d-block text-black h6 text-uppercase">London</span>
              <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="p-4 bg-white mb-3 rounded">
              <span className="d-block text-black h6 text-uppercase">Canada</span>
              <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficesSection;
