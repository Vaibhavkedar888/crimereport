import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/reports');
            setReports(res.data);
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (reportId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/api/reports/${reportId}/status`, { status: newStatus });
            setReports(reports.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    const filteredReports = filter === 'ALL' ? reports : reports.filter(r => r.status === filter);

    return (
        <div className="animate-fade-in" style={{ padding: '3rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)' }}>Authority Dashboard</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and track all citizen crime reports in the jurisdiction</p>
                </div>
                
                <select 
                    className="input-field" 
                    style={{ width: '220px', marginBottom: 0, padding: '10px 16px', background: 'white', fontWeight: '600' }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="ALL">All Cases</option>
                    <option value="PENDING">Pending Triage</option>
                    <option value="INVESTIGATING">Actively Investigating</option>
                    <option value="RESOLVED">Resolved Cases</option>
                    <option value="REJECTED">Rejected / Spam</option>
                </select>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                {loading ? <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading network reports...</div> : (
                    filteredReports.length === 0 ? <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No reports match the current filter.</div> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
                                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Case ID / Date</th>
                                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Incident Details</th>
                                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Location</th>
                                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Evidence Attachment</th>
                                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Status & Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.map(report => (
                                        <tr key={report.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                                            <td style={{ padding: '24px', verticalAlign: 'top' }}>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: '700', fontFamily: 'monospace', background: 'var(--primary-light)', padding: '4px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' }}>
                                                    #{report.id.substring(report.id.length - 6).toUpperCase()}
                                                </div>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>{new Date(report.timestamp).toLocaleDateString()}</div>
                                            </td>
                                            <td style={{ padding: '24px', maxWidth: '350px', verticalAlign: 'top' }}>
                                                <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{report.title}</strong>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '6px', textTransform: 'uppercase' }}>
                                                    {report.category}
                                                </div>
                                                <p style={{ fontSize: '0.9rem', marginTop: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{report.description}</p>
                                            </td>
                                            <td style={{ padding: '24px', verticalAlign: 'top', color: 'var(--text-main)', fontWeight: '500' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    {report.location}
                                                </div>
                                            </td>
                                            <td style={{ padding: '24px', verticalAlign: 'top' }}>
                                                {report.evidenceUrls && report.evidenceUrls.length > 0 ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        {report.evidenceUrls.map((url, idx) => (
                                                            <a key={idx} href={url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-blue)', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                                                File Attachment {idx+1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>No files attached</span>}
                                            </td>
                                            <td style={{ padding: '24px', verticalAlign: 'top' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                                                    <span className={`badge ${report.status.toLowerCase()}`}>{report.status}</span>
                                                    
                                                    {report.status !== 'RESOLVED' && report.status !== 'REJECTED' && (
                                                        <select 
                                                            onChange={(e) => updateStatus(report.id, e.target.value)}
                                                            className="input-field" 
                                                            style={{ padding: '8px 12px', fontSize: '0.85rem', marginBottom: 0, width: 'auto', background: 'white', borderColor: 'var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}
                                                            value=""
                                                        >
                                                            <option value="" disabled>Update Status...</option>
                                                            {report.status === 'PENDING' && <option value="INVESTIGATING">Mark as Investigating</option>}
                                                            <option value="RESOLVED">Mark as Resolved</option>
                                                            <option value="REJECTED">Reject Report</option>
                                                        </select>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
