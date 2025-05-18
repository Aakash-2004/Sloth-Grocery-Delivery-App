import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import API_URL from '../config/api';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const errs = {};
        if (!form.username.trim()) errs.username = 'Username is required';
        if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Valid email required';
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
        if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = 'Phone must be 10 digits';
        return errs;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);
        setLoading(true);
        setSuccess('');
        setErrors({});

        try {
            const response = await axios.post(`${API_URL}/register`, {
                username: form.username,
                email: form.email,
                password: form.password,
                phone: form.phone
            });

            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token);
                setSuccess('Account created successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ submit: error.response?.data?.message || 'Registration failed. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-bg">
            <div className="register-container">
                <h2>Create Your Account</h2>
                <p className="register-subtitle">Sign up to get groceries delivered in minutes!</p>
                {success && <div className="alert success">{success}</div>}
                <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className={errors.username ? 'error-input' : ''}
                            placeholder="Enter your username"
                            autoFocus
                            required
                        />
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={errors.email ? 'error-input' : ''}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone (optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'error-input' : ''}
                            placeholder="10-digit phone number"
                            maxLength={10}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className={errors.password ? 'error-input' : ''}
                            placeholder="Create a password"
                            required
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error-input' : ''}
                            placeholder="Confirm your password"
                            required
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className={`submit-btn${loading ? ' loading' : ''}`} disabled={loading}>
                        {loading ? <span className="spinner"></span> : 'Create Account'}
                    </button>
                </form>
                <div className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
