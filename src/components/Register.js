import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import API_URL from '../config/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { username, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset status messages
        setError('');
        setSuccess('');
        
        // Validation
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        
        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        try {
            setLoading(true);
            console.log('Sending registration request to:', `${API_URL}/register`);
            
            const response = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password
            });
            
            console.log('Registration response:', response);
            
            setSuccess('Registration successful! You can now log in.');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (error) {
            console.error('Registration error details:', error);
            
            setError(
                error.response?.data?.message || 
                error.message ||
                'Registration failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Create Your Account</h2>
            <p className="register-subtitle">Join Sloth for fast grocery delivery</p>
            
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username" 
                        value={username} 
                        onChange={handleChange} 
                        placeholder="Choose a username" 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email" 
                        value={email} 
                        onChange={handleChange} 
                        placeholder="Your email address" 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                        placeholder="Create a password" 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={handleChange} 
                        placeholder="Confirm your password" 
                        required 
                    />
                </div>
                
                <button 
                    type="submit" 
                    className={loading ? 'loading-btn' : ''}
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
            
            <div className="login-link">
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </div>
    );
};

export default Register;
