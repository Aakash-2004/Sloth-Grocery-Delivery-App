import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/admin/Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-dashboard ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="toggle-sidebar" onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <div className="admin-profile">
          <div className="admin-avatar">
            {userData.name?.charAt(0).toUpperCase()}
          </div>
          <div className="admin-info">
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
        </div>
        
        <nav className="admin-nav">
          <ul>
            <li>
              <Link to="/admin/dashboard">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <i className="fas fa-box"></i>
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/categories">
                <i className="fas fa-tags"></i>
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders">
                <i className="fas fa-shopping-cart"></i>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <i className="fas fa-users"></i>
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/settings">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="admin-content">
        <div className="admin-topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className="topbar-right">
            <Link to="/" className="view-site-btn">
              <i className="fas fa-external-link-alt"></i>
              <span>View Site</span>
            </Link>
            <Link to="/logout" className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link>
          </div>
        </div>
        
        <div className="admin-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 