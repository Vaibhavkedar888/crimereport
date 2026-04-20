import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const CitizenDashboard = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [files, setFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await api.get(`/reports/user/${user.id}`);
            setReports(res.data);
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const submitReport = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('location', location);
        formData.append('reporterId', user.id);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            await api.post('/reports', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Report submitted successfully. Authorities have been pinged.');
            fetchReports();
            setTitle(''); setDescription(''); setCategory(''); setLocation(''); setFiles([]);
            document.getElementById("file-upload").value = "";
        } catch (error) {
            console.error("Backend error response:", error.response);
            const serverMsg = error.response?.data ? (typeof error.response.data === 'string' ? error.response.data : error.response.data.message) : '';
            setMessage(`Error submitting report: ${serverMsg || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ padding: '3rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)' }}>Your Dashboard</h2>
                <p style={{ color: 'var(--text-muted)' }}>Manage your active reports and file new ones</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem' }}>
                {/* Submit New Report */}
                <div className="card" style={{ alignSelf: 'start', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>File New Report</h3>
                    </div>

                    {message && <div style={{ color: message.includes('success') ? 'var(--success-color)' : 'var(--danger-color)', marginBottom: '1.5rem', padding: '12px', background: message.includes('success') ? 'var(--success-bg)' : 'var(--danger-bg)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500' }}>{message}</div>}

                    <form onSubmit={submitReport}>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Report Title</label>
                        <input type="text" placeholder="E.g., Vandalism at City Park" className="input-field" value={title} onChange={e => setTitle(e.target.value)} required />

                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Category</label>
                        <select className="input-field" value={category} onChange={e => setCategory(e.target.value)} required style={{ appearance: 'none', cursor: 'pointer' }}>
                            <option value="" disabled>Select a crime category</option>
                            <option value="Theft">Theft</option>
                            <option value="Assault">Assault</option>
                            <option value="Harassment">Harassment</option>
                            <option value="Vandalism">Vandalism</option>
                            <option value="Other">Other</option>
                        </select>

                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Exact Location</label>
                        <input type="text" placeholder="123 Main St, Near Central Bank" className="input-field" value={location} onChange={e => setLocation(e.target.value)} required />

                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Detailed Description</label>
                        <textarea placeholder="Provide as much context as possible..." className="input-field" rows="4" value={description} onChange={e => setDescription(e.target.value)} required style={{ resize: 'vertical' }}></textarea>

                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Upload Evidence (Photos/Videos)</label>
                        <input type="file" id="file-upload" multiple className="input-field" onChange={handleFileChange} style={{ padding: '10px', background: 'white' }} />

                        <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: '0.5rem' }}>
                            {submitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </form>
                </div>

                {/* Report History */}
                <div>
                    <div className="card" style={{ padding: '2rem', minHeight: '500px' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            My Reports History
                        </h3>
                        {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading records...</p> : (
                            reports.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: '1rem', opacity: 0.5 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                                    <p>You haven't submitted any reports yet.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {reports.map(report => (
                                        <div key={report.id} style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '12px', transition: 'transform 0.2s', ':hover': { transform: 'scale(1.01)' } }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: '700' }}>{report.title}</h4>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                                                        <span style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>{report.category}</span> • Filed {new Date(report.timestamp).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`badge ${report.status.toLowerCase()}`}>{report.status}</span>
                                            </div>
                                            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '12px', background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>{report.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitizenDashboard;
