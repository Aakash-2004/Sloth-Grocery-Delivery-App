import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config/api';
import '../../styles/AdminUsers.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.patch(`${API_URL}/admin/users/${userId}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.patch(`${API_URL}/admin/users/${userId}/status`, 
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      setError('Failed to update user status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="admin-users-loading">Loading users...</div>;
  if (error) return <div className="admin-users-error">{error}</div>;

  return (
    <div className="admin-users">
      <div className="users-header">
        <h1>Users Management</h1>
        <div className="users-filters">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="role-filter"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
            <option value="employee">Employees</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className={`role-select ${user.role}`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </select>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedUser(user)}
                  >
                    View Details
                  </button>
                  <button
                    className={`toggle-status-btn ${user.isActive ? 'deactivate' : 'activate'}`}
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="user-modal">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setSelectedUser(null)}
            >
              ×
            </button>
            <h2>User Details</h2>
            
            <div className="user-details">
              <div className="user-profile">
                <div className="profile-avatar">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <h3>{selectedUser.name}</h3>
                <p className="user-email">{selectedUser.email}</p>
                <span className={`role-badge ${selectedUser.role}`}>
                  {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                </span>
              </div>

              <div className="user-stats">
                <div className="stat-item">
                  <h4>Account Created</h4>
                  <p>{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div className="stat-item">
                  <h4>Last Login</h4>
                  <p>{selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'Never'}</p>
                </div>
                <div className="stat-item">
                  <h4>Total Orders</h4>
                  <p>{selectedUser.totalOrders || 0}</p>
                </div>
                <div className="stat-item">
                  <h4>Account Status</h4>
                  <p className={`status-text ${selectedUser.isActive ? 'active' : 'inactive'}`}>
                    {selectedUser.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>

              <div className="user-actions">
                <button
                  className={`toggle-status-btn ${selectedUser.isActive ? 'deactivate' : 'activate'}`}
                  onClick={() => {
                    toggleUserStatus(selectedUser._id, selectedUser.isActive);
                    setSelectedUser(null);
                  }}
                >
                  {selectedUser.isActive ? 'Deactivate Account' : 'Activate Account'}
                </button>
                <select
                  value={selectedUser.role}
                  onChange={(e) => {
                    updateUserRole(selectedUser._id, e.target.value);
                    setSelectedUser({ ...selectedUser, role: e.target.value });
                  }}
                  className={`role-select ${selectedUser.role}`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 