import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import largeLogo from '../component/helper/Logo/Message_Logo1.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser && storedUser.customerName) {
      setUserName(storedUser.customerName);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('searchSelection');
    toast.success('Logout successful!', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" data-toggle="collapse" data-target="#yourSidebarID">
        <i className="fa fa-bars"></i>
      </button>
      <div className="input-group-append">
        <img src={largeLogo} alt="Logo" style={{ width: '200px', maxWidth: '100%' }} />
      </div>
      <ul className="navbar-nav ml-auto">
      
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userName}</span>
            <img className="img-profile rounded-circle"
              src="/img/undraw_profile.svg" alt="User Profile" />
          </a>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {isLoggedIn ? (
              <div className="btn btn-primary" data-toggle="modal" data-target="#logoutModal" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </div>
            ) : (
              <Link to="/login" className="dropdown-item">
                Login
              </Link>
            )}
          </a>
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown">
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
