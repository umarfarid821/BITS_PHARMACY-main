import React from 'react';
import U from './images/U.jpg';
import J from './images/J.jpg';
import R from './images/R.jpg';
import M from './images/M.jpg';
import './TeamMember.css';
const TeamMember = ({ name, role, image, description }) => {
  return (
    <div className="col-md-6 col-lg-6 mb-5">
      <div className="block-38 text-center">
        <div className="block-38-img">
          <div className="block-38-header">
            <img src={image} alt="Image placeholder" className="mb-4  img-adjust  img-fluid rounded-circle " />
            <h3 className="block-38-heading h4">{name}</h3>
            <p className="block-38-subheading">{role}</p>
          </div>
          <div className="block-38-body">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const TeamSection = () => {
  return (
    <div className="site-section bg-secondary custom-border-bottom" data-aos="fade">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 site-section-heading text-center pt-4">
            <h2>The Team</h2>
          </div>
        </div>
        <div className="row">
          <TeamMember
            name="UmarFarid"
            role="CEO/Co-Founder"
            image={U}
            description="Introducing Umar: the visionary CEO driving innovation at Bits Pharmacy. With a passion for revolutionizing healthcare accessibility, Umar leads the charge towards a future where quality medication is just a click away."
          />
          <TeamMember
            name="Abdul Moiz"
            role="Co-Founder"
            image={M}
            description="Meet Moiz: the tech-savvy co-founder shaping the digital landscape of Bits Pharmacy. With Moiz's expertise, we're redefining convenience in the online pharmacy experience, making wellness products accessible to all."
          />
          <TeamMember
            name="Rohail Ahmad"
            role="Marketing"
            image={R}
            description="Welcome Rohail: the creative marketing manager behind Bits Pharmacy's dynamic campaigns. "
          />
          <TeamMember
            name="Mike Coolbert"
            role="Sales Manager"
            image={J}
            description=" Sales Manager at Bits Pharmacy, driving growth with customer-centric strategies."
          />
        </div>
      </div>
    </div>
  );
}

export default TeamSection;