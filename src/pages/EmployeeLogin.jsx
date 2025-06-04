import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaLock, FaShoppingBasket, FaTruck, FaStore, FaArrowLeft } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const EmployeeLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, error: contextError } = useUser();
    const [formData, setFormData] = useState({
        employeeId: '',
        password: '',
        rememberMe: false
    });
    const [selectedRole, setSelectedRole] = useState('picker');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const success = await login(formData, selectedRole);
            if (success) {
                // Redirect to the appropriate dashboard or saved location
                const from = location.state?.from?.pathname || `/${selectedRole}-dashboard`;
                navigate(from, { replace: true });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const roles = [
        { id: 'picker', icon: FaShoppingBasket, label: 'Picker' },
        { id: 'delivery', icon: FaTruck, label: 'Delivery' },
        { id: 'store-manager', icon: FaStore, label: 'Store Manager' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <img src="/assets/sloth-logo.png" alt="Sloth Logo" className="h-12" />
                        <h1 className="text-3xl font-bold text-emerald-500">Sloth</h1>
                    </div>

                    <h2 className="text-2xl text-gray-800 text-center mb-8">Employee Login</h2>

                    {(contextError || isLoading) && (
                        <div className={`mb-4 p-3 rounded-lg ${
                            contextError 
                                ? 'bg-red-100 border border-red-400 text-red-700'
                                : 'bg-blue-100 border border-blue-400 text-blue-700'
                        }`}>
                            {contextError || 'Logging in...'}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleInputChange}
                                placeholder="Employee ID"
                                required
                                disabled={isLoading}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors disabled:bg-gray-100"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                required
                                disabled={isLoading}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors disabled:bg-gray-100"
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 text-gray-700">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="rounded text-emerald-500 focus:ring-emerald-500 disabled:opacity-50"
                                />
                                Remember me
                            </label>
                            <Link 
                                to="/forgot-password" 
                                className="text-emerald-500 hover:text-emerald-600 disabled:opacity-50"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Role Selector */}
                    <div className="mt-8 text-center">
                        <h3 className="text-gray-800 mb-4">Select Role</h3>
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
                            {roles.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setSelectedRole(id)}
                                    disabled={isLoading}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all
                                        ${selectedRole === id
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'border-gray-200 hover:border-emerald-200'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <Icon className="text-xl" />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-emerald-500 transition-colors"
                        >
                            <FaArrowLeft />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin; 