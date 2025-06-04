import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import BaseDashboard from '../../components/dashboard/BaseDashboard';
import {
    FaHome,
    FaClipboardList,
    FaBox,
    FaChartBar,
    FaBell,
    FaCog,
    FaShoppingBasket,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle
} from 'react-icons/fa';

const PickerDashboard = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Navigation items specific to picker role
    const navItems = [
        { path: '/picker-dashboard', icon: <FaHome />, label: 'Dashboard' },
        { path: '/picker-dashboard/orders', icon: <FaClipboardList />, label: 'Orders' },
        { path: '/picker-dashboard/inventory', icon: <FaBox />, label: 'Inventory' },
        { path: '/picker-dashboard/stats', icon: <FaChartBar />, label: 'Statistics' },
        { path: '/picker-dashboard/notifications', icon: <FaBell />, label: 'Notifications' },
        { path: '/picker-dashboard/settings', icon: <FaCog />, label: 'Settings' }
    ];

    // Stats for the dashboard
    const stats = [
        {
            icon: <FaShoppingBasket className="text-emerald-500" />,
            value: '12',
            label: 'Pending Orders',
            iconBg: 'bg-emerald-100'
        },
        {
            icon: <FaCheckCircle className="text-blue-500" />,
            value: '45',
            label: 'Completed Today',
            iconBg: 'bg-blue-100'
        },
        {
            icon: <FaClock className="text-orange-500" />,
            value: '8 min',
            label: 'Avg. Pick Time',
            iconBg: 'bg-orange-100'
        }
    ];

    useEffect(() => {
        // TODO: Fetch orders from API
        const fetchOrders = async () => {
            try {
                // const response = await axios.get('/api/picker/orders');
                // setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <BaseDashboard
            title="Picker Dashboard"
            subtitle="Welcome back, {user?.name}! Here's your overview for today."
            stats={stats}
            role="picker"
            navItems={navItems}
        >
            {/* Orders Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                    <div className="flex gap-4">
                        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500">
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 w-64"
                        />
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sample Order Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-semibold text-gray-800">Order #12345</h4>
                                <p className="text-sm text-gray-500">2 items • 15 minutes ago</p>
                            </div>
                            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                                High Priority
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaShoppingBasket className="text-emerald-500" />
                                <span>5 items to pick</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaClock className="text-blue-500" />
                                <span>Estimated time: 15 mins</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <button className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                                Start Picking
                            </button>
                        </div>
                    </div>

                    {/* Add more order cards here */}
                </div>

                {/* Alerts Section */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Alerts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                            <FaExclamationTriangle className="text-orange-500 mt-1" />
                            <div>
                                <h4 className="font-medium text-orange-800">Low Stock Alert</h4>
                                <p className="text-sm text-orange-600">
                                    Product "Organic Bananas" is running low on stock. Please notify store manager.
                                </p>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                            <FaBell className="text-blue-500 mt-1" />
                            <div>
                                <h4 className="font-medium text-blue-800">New Training Available</h4>
                                <p className="text-sm text-blue-600">
                                    Complete the new inventory management training module.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseDashboard>
    );
};

export default PickerDashboard; 