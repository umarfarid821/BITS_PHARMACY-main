import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="site-footer bg-primary">
      <div className="container  height">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div className="block-7">
              <h3 className="footer-heading mb-4 ">About Us</h3>
              <p className='text-white'>At Bits Pharmacy, expect nothing short of excellence in product delivery and services.</p>
            </div>
          </div>
          <div className="col-lg-3 mx-auto mb-5 mb-lg-0">
            <h3 className="footer-heading mb-4">Quick Links</h3>
            <ul className="list-unstyled">
              <li className='ql's><a href="#">Supplements</a></li>
              <li className='ql'><a href="#">Vitamins</a></li>
              <li className='ql'><a href="#">Diet &amp; Nutrition</a></li>
              <li className='ql'><a href="#">Tea &amp; Coffee</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 ">
            <div className="block-5 mb-5">
            
              <h3 className="footer-heading mb-4">Contact Info</h3>
              <ul className="list-unstyled ">
              
                <li className="address">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
              </svg>
              Green Society, Lahore, Punjab, PAKISTAN</li>
                <li className="phone"><a href="tel://+923151102664">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-forward-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708"/>
</svg>+923151102664</a></li>
                <li className="email">
                <a href="email@domain.com"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-paper-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75zM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765M16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516zm-8 3.3 5.693-3.162L0 6.873v6.5Z"/>
              </svg>email@domain.com</a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
