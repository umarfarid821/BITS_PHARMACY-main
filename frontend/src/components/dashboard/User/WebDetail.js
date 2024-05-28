import React from 'react';
import img2 from './images/bg_2.jpg';

const BannerSection = () => {
  return (
    <div className="bg-light bg-image" style={{backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '80vh'}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 offset-lg-6">
            <div className="p-5 text-center text-lg-start">
              <h2 className="text-uppercase mb-4">What Experts think about our products?</h2>
              <p className="mb-5">Experts in the pharmaceutical industry have consistently praised BITS Pharmacy Products for their unparalleled quality, efficacy, and reliability. Through rigorous testing and continuous innovation, our products have garnered commendation from leading professionals in the field. With a commitment to excellence and a dedication to meeting the highest standards of safety and effectiveness, experts commend BITS Pharmacy Products as a trusted choice for healthcare professionals and patients alike.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
