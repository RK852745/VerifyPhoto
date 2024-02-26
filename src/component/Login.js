import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './helper/Logo/Message_Logo1.png';
import { UserLogin } from './Server/API';
import Swal from 'sweetalert2';
import './Login.css'; // Import CSS file for custom styling

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Remove non-numeric characters and limit to 10 digits
      const phone = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: phone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = formData;
    if (password.length < 4 || password.length > 6) {
      displayErrorMessage('Password must be between 4 and 6 characters long.');
      return;
    }
    try {
      const response = await UserLogin({
        username: phone,
        password: password,
      });
   console.log("Login Response For API",response)
      if (response.success) {
        const user = response.data;
        sessionStorage.setItem('user', JSON.stringify(user));
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to TrucksUp!',
        }); 
        onLogin(true);
        navigate('/dashboard');// Redirect to dashboard
      } else { 
        displayErrorMessage('Invalid Phone or Password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const displayErrorMessage = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  };

  const handleReset = () => {
    setFormData({ phone: '', password: '' });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary"> {/* Background color applied */}
      <div className="card">
        <div className="card-body">
          {/* Logo */}
          <div className="app-brand justify-content-center">
            <a href="Login.aspx" className="app-brand-link gap-2">
              <span className="app-brand-logo demo"><center>
              <img height="100" src={logo} alt="Logo"  />
              </center>
              </span>
            </a>
          </div>
          {/* /Logo */}
          <h4 className="mb-2">Welcome to TrucksUp! 👋</h4>
          <p className="mb-4">Please sign-in to your account and start the adventure</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Mobile Number</label>
              <input
                type="tel" // Change input type to "tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your 10-digit mobile number"
                autoFocus
                required
              />
            </div>
            <div className="mb-3 form-password-toggle">
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label" htmlFor="password">Password</label>
                <button type="button" className="btn btn-link" onClick={handleTogglePassword}>
                  {showPassword ? <i className="bx bx-hide"></i> : <i className="bx bx-show"></i>}
                </button>
              </div>
              <div className="input-group input-group-merge">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility based on showPassword state
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="············"
                  aria-describedby="Password"
                  minLength="4" // Minimum password length
                  maxLength="6" // Maximum password length
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember-me" />
                <label className="form-check-label" htmlFor="remember-me">Remember Me </label>
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
            </div>
            <div className="mb-3">
              <button className="btn btn-secondary d-grid w-100" type="reset" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
