import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Footer from './component/Footer';
import VerifyImg from './component/VerifyImg';
import Login from './component/Login';
import CryptoJS from 'crypto-js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('user'));  // Check if user is logged in
  const [isOpen, setIsOpen] = useState(false); // Sidebar state 

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Encrypt the parameters before passing to the URL
  function encryptParams(params) {
    // Encrypt the parameters using crypto-js AES encryption
    const encryptedParams = CryptoJS.AES.encrypt(JSON.stringify(params), 'secret').toString();
    // Encode the encrypted parameters to make it URL safe
    return encodeURIComponent(encryptedParams);
  }

  return (
    <Router>
      <Routes>
        {/* Route for the root URL */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Dashboard route */}
        <Route path="/dashboard" element={isLoggedIn ? (
          <DashboardLayout>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Dashboard />
          </DashboardLayout>
        ) : (
          <Navigate to="/login" />
        )} />

        {/* Verification page route */}
        <Route
          path="/verify/:id/:batchId"
          element={isLoggedIn ? (
            <DashboardLayout>
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <VerifyImg />
            </DashboardLayout>
          ) : (
            <Navigate to={`/login?params=${encryptParams({ id: 'encryptedId', batchId: 'encryptedBatchId' })}`} />
          )}
        />

        {/* Login page route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

// Component for Dashboard layout (includes Sidebar and Footer)
const DashboardLayout = ({ children }) => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
