 
import React, { useEffect, useState } from 'react';
import smallLogo from '../component/helper/Logo/Logo.jpg';
import largeLogo from '../component/helper/Logo/Message_Logo1.png';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  
  useEffect(() => {
    // Retrieve user details from local storage
    //const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    // Set user name to state
    if (storedUser && storedUser.customerName) {
      setUserName(storedUser.customerName);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage
    // localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('searchSelection');
    // Show a success toast
    toast.success('Logout successful!', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Update the state to trigger a re-render and redirect to the login page
    setIsLoggedIn(false);

    // Navigate to the login page (if you are using react-router)
     navigate('/login');
    // window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" data-toggle="collapse" data-target="#yourSidebarID">
  <i className="fa fa-bars"></i>
</button>


      {/* Topbar Search */}
      <div className="input-group-append">
      <img src={largeLogo} alt="Logo"   style={{ width: '200px', maxWidth: '100%' }} />         
      </div>  {/* Topbar Search */}
       
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - Search Dropdown (Visible Only XS) */}
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search fa-fw"></i>
          </a>
          {/* Dropdown - Messages */}
          <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown">
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small"
                  placeholder="Search for..." aria-label="Search"
                  aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        {/* Nav Item - Alerts */}
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

          {/* Dropdown - Alerts */}
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown">
            {/* Add your Alerts dropdown content here */}
          </div>
        </li>

        {/* Nav Item - Messages */}
        <li className="nav-item dropdown no-arrow mx-1">
          {/* <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-envelope fa-fw"></i>
            <span className="badge badge-danger badge-counter">7</span>
          </a> */}
          {/* Dropdown - Messages */}
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="messagesDropdown">
            {/* Add your Messages dropdown content here */}
          </div>
        </li>

        {/* <div className="topbar-divider d-none d-sm-block"></div> */}

        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userName}</span>
            <img className="img-profile rounded-circle"
              src="/img/undraw_profile.svg" alt="User Profile" />
          </a>
          
          {/* Dropdown - User Information */}
          
          {/* <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
  <a className="dropdown-item" href="#">
    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
    Profile
  </a>
  <a className="dropdown-item" href="#">
    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
    Settings
  </a>
  <a className="dropdown-item" href="#">
    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
    Activity Log
  </a>
  <div className="dropdown-divider"></div>

  {isLoggedIn ? (
    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={handleLogout}>
      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
      Logout
    </a>
  ) : (
    <Link to="/login" className="dropdown-item">
      Login
    </Link>
  )}
          </div> */}

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
