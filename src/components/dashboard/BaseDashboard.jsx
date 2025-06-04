import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
    FaHome,
    FaClipboardList,
    FaMapMarkerAlt,
    FaChartBar,
    FaBell,
    FaCog,
    FaSignOutAlt,
    FaShoppingBasket,
    FaTruck,
    FaStore,
    FaUserCircle
} from 'react-icons/fa';

const BaseDashboard = ({ 
    children, 
    title, 
    subtitle, 
    stats,
    role,
    navItems 
}) => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/employee/login');
    };

    const getRoleIcon = () => {
        switch (role) {
            case 'picker':
                return <FaShoppingBasket className="text-2xl" />;
            case 'delivery':
                return <FaTruck className="text-2xl" />;
            case 'store-manager':
                return <FaStore className="text-2xl" />;
            default:
                return <FaUserCircle className="text-2xl" />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed h-full bg-white shadow-lg transition-all duration-300 ${
                isSidebarCollapsed ? 'w-20' : 'w-72'
            }`}>
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-4 mb-12">
                        <img src="/assets/sloth-logo.png" alt="Sloth Logo" className="h-10" />
                        {!isSidebarCollapsed && (
                            <h1 className="text-2xl font-bold text-emerald-500">Sloth</h1>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2 mb-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-emerald-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {item.icon}
                                {!isSidebarCollapsed && (
                                    <span>{item.label}</span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                                {getRoleIcon()}
                            </div>
                            {!isSidebarCollapsed && (
                                <div>
                                    <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{role}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${
                isSidebarCollapsed ? 'ml-20' : 'ml-72'
            }`}>
                <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                            <p className="text-gray-600">{subtitle}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            {/* Stats */}
                            {stats && (
                                <div className="flex gap-4">
                                    {stats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4"
                                        >
                                            <div className={`p-3 rounded-full ${
                                                stat.iconBg || 'bg-emerald-100'
                                            }`}>
                                                {stat.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {stat.value}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BaseDashboard; 