import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize user state from localStorage on mount
    useEffect(() => {
        const initializeUser = async () => {
            const token = localStorage.getItem('userToken');
            const userData = localStorage.getItem('userData');
            const userRole = localStorage.getItem('userRole');

            if (token && userData) {
                try {
                    // Verify token with backend
                    const response = await axios.get('http://localhost:5000/api/auth/verify', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (response.data.valid) {
                        setUser({
                            ...JSON.parse(userData),
                            role: userRole
                        });
                    } else {
                        // Token invalid, clear storage
                        logout();
                    }
                } catch (err) {
                    console.error('Token verification failed:', err);
                    logout();
                }
            }
            setLoading(false);
        };

        initializeUser();
    }, []);

    const login = async (credentials, role) => {
        try {
            setError(null);
            const endpoint = role === 'admin' 
                ? 'http://localhost:5000/api/auth/admin/login'
                : 'http://localhost:5000/api/auth/employee/login';

            const response = await axios.post(endpoint, {
                ...credentials,
                role
            });

            const { token, user: userData } = response.data;

            // Store auth data
            localStorage.setItem('userToken', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userRole', role);

            // Set axios default header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Update user state
            setUser({ ...userData, role });
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        // Clear storage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userRole');

        // Remove axios default header
        delete axios.defaults.headers.common['Authorization'];

        // Clear user state
        setUser(null);
    };

    const isAuthenticated = () => !!user;

    const hasRole = (roles) => {
        if (!user) return false;
        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }
        return user.role === roles;
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
        hasRole
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Higher-order component to protect routes based on roles
export const withRole = (WrappedComponent, allowedRoles) => {
    return function WithRoleComponent(props) {
        const { user, hasRole } = useUser();
        
        if (!user) {
            return <Navigate to="/login" replace />;
        }

        if (!hasRole(allowedRoles)) {
            // Redirect to appropriate dashboard based on role
            switch (user.role) {
                case 'admin':
                    return <Navigate to="/admin/dashboard" replace />;
                case 'picker':
                    return <Navigate to="/picker-dashboard" replace />;
                case 'delivery':
                    return <Navigate to="/delivery-dashboard" replace />;
                case 'store-manager':
                    return <Navigate to="/store-dashboard" replace />;
                default:
                    return <Navigate to="/login" replace />;
            }
        }

        return <WrappedComponent {...props} />;
    };
}; 