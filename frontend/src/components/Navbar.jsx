import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <circle cx="12" cy="11" r="3" fill="var(--primary-light)"></circle>
                </svg>
                Smart Crime<span>Report</span>
            </Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span style={{ color: 'var(--text-main)', fontWeight: '600', marginRight: '10px' }}>Hello, {user.name.split(" ")[0]}</span>
                        {user.role === 'ROLE_ADMIN' ? (
                            <Link to="/admin" className={isActive("/admin")}>Admin Dashboard</Link>
                        ) : (
                            <Link to="/dashboard" className={isActive("/dashboard")}>My Dashboard</Link>
                        )}
                        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={isActive("/login")}>Login</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '10px 24px', textDecoration: 'none' }}>
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
