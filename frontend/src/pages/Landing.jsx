import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="animate-fade-in" style={{ padding: '6rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

            <div style={{ background: 'var(--primary-light)', padding: '6px 16px', borderRadius: '30px', color: 'var(--primary-blue)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Smart Crime Reporting Platform
            </div>

            <h1 style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
                Secure. Crime. <span style={{ color: 'var(--primary-blue)' }}>Report.</span>
            </h1>

            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '3.5rem' }}>
                Submit reports safely and directly to local authorities. Track investigation progress in real-time with an easy-to-use digital portal designed for citizens.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem', textDecoration: 'none', width: 'auto' }}>
                    Report Now
                </Link>
                <Link to="/login" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1.1rem', textDecoration: 'none', width: 'auto' }}>
                    Track Case
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '6rem', width: '100%', maxWidth: '1100px' }}>
                <div className="card" style={{ textAlign: 'left', padding: '2.5rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Real-time Status</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>Watch your case progress from filing to investigation, and ultimately to a confident resolution with live updates.</p>
                </div>
                <div className="card" style={{ textAlign: 'left', padding: '2.5rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Attach Evidence</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>Securely upload high-quality photos and videos directly from your local device to aid authorities seamlessly.</p>
                </div>
                <div className="card" style={{ textAlign: 'left', padding: '2.5rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Direct Security Line</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>Your reports are routed instantly to regional officers, ensuring standard processing times are drastically reduced.</p>
                </div>
            </div>

            <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', width: '100%', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                created by the student of CSE
            </div>
        </div>
    );
};

export default Landing;
