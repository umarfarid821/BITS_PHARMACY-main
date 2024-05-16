import React from 'react';

const UserProfile = () => {
  // Define the function to handle the "Profile" button click
  window.location.href = '/admin/profile';
};

const UserStockMedicine = () => {
  // Define the function to handle the "Profile" button click
  window.location.href = '/user/stockmedicines';
};

const handleCartDisplay = () => {
  // Define the function to handle the "Profile" button click
  window.location.href = '/user/cart';
};

const UserFeedback = () => {
  // Define the function to handle the "Profile" button click
  window.location.href = '/user/feedback';
};
const Home=()=>{
  window.location.href = '/user_dashboard';
   
};
const handleLogout = () => {
  // Handle logout logic here, such as clearing authentication token and redirecting to landing page
  localStorage.removeItem('UserToken');
  window.location.href = '/'; // Replace with the actual route for your landing page
};
const AboutPage=()=>{
  window.location.href = '/user/about';
}



//mnn
class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Bits Pharmacy</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link "  onClick={Home} >Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item  bg-primary">
              <a className="nav-link  "   onClick={UserStockMedicine}>Shop </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleCartDisplay} >Cart Display</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" onClick={AboutPage}>About</a>
          </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
            <li className="nav-item">
            <a className="nav-link"  onClick={handleLogout} >Logout</a>
          </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
         
        </div>
      </nav>
    );
  }
}

export default Navbar;
