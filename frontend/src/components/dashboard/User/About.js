import React from 'react';
import Navbar from './User_Navbar';
import './About.css';
import Img3 from './images/3.jpg';
import Img2 from './images/2.jpg';
import U from './images/U.jpg';
import J from './images/J.jpg';
import R from './images/R.jpg';
import M from './images/M.jpg';
import TeamSection from './TeamMember';
import Footer from './Footer';
const About = () => {

    return (
        <div className='overflow-scroll bg-light'>
        <Navbar />
        <div className="site-blocks-cover my " >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
              <div className="site-block-cover-content text-center">
                <h2 className="sub-title fix">Effective Medicine, Fast Delivery Service </h2>
                <h1 className=''>Welcome To Bits Pharmacy </h1>
                <p>About Page 
                              </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="site-section bg-light custom-border-bottom fix" data-aos="fade">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="block-16">
              <figure>
                <img src={Img3} alt="Image placeholder" className="img-fluid rounded" />
                      </figure>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="site-section-heading pt-3 mb-4">
              <h2 className="text-black">How We Started</h2>
            </div>
            <p>In the early days, our founders, Umar, Moiz, and Rohail, shared a passion for leveraging technology to bridge gaps in healthcare access. With dedication and expertise, they laid the foundation for Bits Pharmacy, a platform committed to providing convenient, personalized healthcare solutions for all.</p>
               </div>
        </div>
      </div>
    </div>



    <div className="site-section bg-info  fix custom-border-bottom" data-aos="fade">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-6 order-md-2">
          <div className="block-16">
            <figure>
              <img src={Img2} alt="Image placeholder" className="img-fluid rounded" />
                 </figure>
          </div>
        </div>
        <div className="col-md-5 mr-auto">
          <div className="site-section-heading pt-3 mb-4">
            <h2 className="text-black">We Are Trusted Company</h2>
          </div>
          <p className="text-black">Bits Pharmacy: Your trusted partner in healthcare. With a commitment to quality, integrity, and customer satisfaction, we've earned the trust of thousands of individuals seeking reliable and accessible medication solutions.</p>
                 </div>
      </div>
    </div>
  </div>



  <div className="site-section  fix site-section-sm site-blocks-1 border-0" data-aos="fade">
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="">
        <div className="icon mr-4 align-self-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="30"  color="blue"  height="30" fill="currentColor" className="bi bi-truck-front-fill" viewBox="0 0 16 16">
        <path d="M3.5 0A2.5 2.5 0 0 0 1 2.5v9c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2v-9A2.5 2.5 0 0 0 12.5 0zM3 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.9c0 .625-.562 1.092-1.17.994C10.925 7.747 9.208 7.5 8 7.5s-2.925.247-3.83.394A1.008 1.008 0 0 1 3 6.9zm1 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2m8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-5-2h2a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2"/>
      </svg>
        </div>
        <div className="text">
          <h2>Free Shipping</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="100">
        <div className="icon mr-4 align-self-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" color="blue"   height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
      </svg>
        </div>
        <div className="text">
          <h2>Free Returns</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="200">
        <div className="icon mr-4 align-self-start">
        <svg xmlns="http://www.w3.org/2000/svg"  width="25" color="blue"   height="30" fill="currentColor" class="bi bi-patch-question-fill" viewBox="0 0 16 16">
        <path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627"/>
      </svg>
        </div>
        <div className="text">
          <h2>Customer Support</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="fix">
 <TeamSection />
</div>
<div className="">
<Footer />
</div>


        </div>
    );
    }

    export default About;