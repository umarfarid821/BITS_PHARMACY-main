import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginstyle.css';

const LoginForm = ({ setToken, setUserId }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Sending login request...');
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);

      if (response.status === 200) {
        console.log('Login successful');
         const { userId, token } = response.data;
      //  const { token } = response.data;
        // setUserId(userId); // Set userId
        setToken(token);
        // Save the token to local storage
        localStorage.setItem('token', token);
        console.log(response.data.role);
        console.log(response.data);

if (response.data.role === 'user') {
  console.log('Navigating to user dashboard page...');
  navigate('/user_dashboard');
} else if (response.data.role === 'admin') {
  console.log('Navigating to admin dashboard page...');
  navigate('/admin_dashboard');

}
else if (response.data.role === 'seller') {


  const sellerid= response.data.userId;
  console.log(sellerid);
  console.log('Navigating to seller dashboard page...');

 navigate(`/admin/showseller/${sellerid}`);
 // navigate('/admin/sellerdashboard');

}

else {
  console.log('Role is neither user nor admin. Handle accordingly.'); // You can handle other roles or cases here.
}

      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }


  };
  const handleRegister = async (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="wrapper1">
      {/* Navigation bar */}
      <nav className="nav">
        {/* Logo */}
        <div className="nav-logo">
          <p>LOGO .</p>
        </div>
        {/* Menu */}
       
        {/* Sign in / Sign up buttons */}
        <div className="nav-button">
          <button className="btn white-btn" >Sign In</button>
          <button className="btn white-btn" onClick={handleRegister}>Sign Up</button>
        </div>
        <div className="nav-menu-btn">
        </div>
      </nav>

      {/* Form container */}
      <div className="form-box">
        {/* Login form */}
        <div className="login-container" id="login">
          {/* Header and toggle link */}
          <div className="top">
            <span onClick={handleRegister}>Don't have an account? <a >Sign Up</a></span>
            <header>Login</header>
          </div>
          {/* Input fields */}
          <div className="input-box">
          <input
          className='input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
            
            <i className="bx bx-user"></i>
          </div>
          <div className="input-box">
          <input
          className='input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="input-box">

          {error && <p className="error">{error}</p>}
      
            <input type="submit"  onClick={handleSubmit} className="submit" value="Sign In" 
            
            />
            {loading ? 'Logging in...' : 'Login'}
   
            </div>
          {/* Remember Me and Forgot password */}
          <div className="two-col">
            <div className="one">
              <input type="checkbox" id="login-check" />
              <label htmlFor="login-check"> Remember Me</label>
            </div>
            <div className="two">
              <label><a href="#">Forgot password?</a></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
