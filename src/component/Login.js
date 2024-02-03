// Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './helper/Logo/Message_Logo1.png';
import { UserLogin } from './Server/API';
import Swal from 'sweetalert2';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  useEffect(() => {
    // Check if user is already logged in, redirect to dashboard if true
    const user = sessionStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserLogin({
        username: formData.phone,
        password: formData.password,
      });

      if (response.success) {
        const user = response.data;
        sessionStorage.setItem('user', JSON.stringify(user));
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to TrucksUp!',
        }); 
        onLogin(true);
        navigate('/dashboard'); 
      } else {
        // Display error message
        displayErrorMessage('Invalid Phone or Password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const displayErrorMessage = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  };

  return (
    <div className="container-fluid bg-gradient-info">
      <div className="container" style={{ height: '100vh' }}>
        <br /><br />
        <div className="row justify-content-center">
          <div className='col-sm-4'></div>
          <div className="col-sm-6">
            <div className="card o-hidden border-0 shadow-lg my-5" style={{ width: '450px', height: '450px'}}>
              <div className="card-body p-0">
                <div className="row">
                  <div className="">
                    <div className="p-5"><center><img src={logo} alt="" width="180px" /></center>
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome to TrucksUp! 👋</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control form-control-user custom-input"
                            id="exampleInputPhone"
                            placeholder="Enter Phone Number..."
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control form-control-user custom-input"
                            id="exampleInputPassword"
                            placeholder="Password"
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-2'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

