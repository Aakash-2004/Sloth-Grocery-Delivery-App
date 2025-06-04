import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const EmployeeRoute = ({ allowedRoles, children }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('userToken') !== null;
    const userRole = localStorage.getItem('userRole');

    if (!isAuthenticated) {
        // Redirect to login but save the attempted URL
        return <Navigate to="/employee/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        switch (userRole) {
            case 'picker':
                return <Navigate to="/picker-dashboard" replace />;
            case 'delivery':
                return <Navigate to="/delivery-dashboard" replace />;
            case 'store-manager':
                return <Navigate to="/store-dashboard" replace />;
            default:
                return <Navigate to="/employee/login" replace />;
        }
    }

    return children;
};

export default EmployeeRoute; 