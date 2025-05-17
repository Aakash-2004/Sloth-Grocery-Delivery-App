import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import '../../styles/AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  
  // Check if user is authenticated as admin
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);
  
  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt', path: '/admin/dashboard' },
    { name: 'Products', icon: 'fas fa-box', path: '/admin/products' },
    { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/admin/orders' },
    { name: 'Customers', icon: 'fas fa-users', path: '/admin/customers' },
    { name: 'Settings', icon: 'fas fa-cog', path: '/admin/settings' }
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };
  
  return (
    <div className="admin-layout">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Sloth Admin</h2>
          {isMobile && (
            <button className="close-sidebar" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      
      <div className={`admin-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="admin-header">
          <button className="toggle-sidebar" onClick={toggleSidebar}>
            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <div className="admin-search">
            <input type="text" placeholder="Search..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="admin-user">
            <span>Admin</span>
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </header>
        
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 