import React, { useState } from 'react';
import smallLogo from '../component/helper/Logo/Logo.jpg';
import largeLogo from '../component/helper/Logo/Message_Logo1.png';

const Sidebar = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isSidebarCollapsed ? 'toggled' : ''}`} id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html"> 
        <div className="sidebar-brand-icon rotate-n-25">
          {/* Add your logo image here */}
          {/* <img src={isSidebarCollapsed ? smallLogo : largeLogo} alt="Logo" style={{ width: '200px', maxWidth: '100%' }} /> */}
          Dashboard
        </div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0"/>

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span> Verification Image</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider"/>

      {/* Heading */}
      <div className="sidebar-heading">
       
      </div>

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={toggleSidebar}></button>
      </div>

      {/* Responsive Sidebar Toggle Button */}
      <div className="text-center d-inline d-md-none">
        <button className="rounded-circle border-0" id="sidebarToggleResponsive" onClick={toggleSidebar}></button>
      </div>
    </div>
  );
};

export default Sidebar;
