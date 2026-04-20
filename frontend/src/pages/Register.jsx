import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', role: 'citizen'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', padding: '3rem 0' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '3rem 2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Join the community and report safely</p>
                </div>

                {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1.5rem', textAlign: 'center', background: 'var(--danger-bg)', padding: '12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '0.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Full Name</label>
                            <input type="text" name="name" placeholder="John Doe" className="input-field" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Phone</label>
                            <input type="tel" name="phone" placeholder="+1 234 567" className="input-field" value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>

                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Email Address</label>
                    <input type="email" name="email" placeholder="john@example.com" className="input-field" value={formData.email} onChange={handleChange} required />
                    
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Password</label>
                    <input type="password" name="password" placeholder="••••••••" className="input-field" value={formData.password} onChange={handleChange} required />
                    
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Account Type</label>
                    <select name="role" className="input-field" value={formData.role} onChange={handleChange} style={{ appearance: 'none', cursor: 'pointer', background: '#f8fafc' }}>
                        <option value="citizen">Register as Citizen</option>
                        <option value="admin">Register as Authority (Admin)</option>
                    </select>
                    
                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1.5rem' }}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                
                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: '600', textDecoration: 'none' }}>Log in here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
