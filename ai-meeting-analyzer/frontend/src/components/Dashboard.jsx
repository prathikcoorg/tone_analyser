import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (e) => {
        if (e && e.preventDefault) e.preventDefault(); 
        
        const file = e.target.files[0];
        if (!file) return;

        console.log("File selected for upload:", file.name);

        const formData = new FormData();
        formData.append('transcript', file);

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/upload-transcript', { 
                method: 'POST', 
                body: formData 
            });
            
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server responded with status ${res.status}: ${errorText}`);
            }

            const result = await res.json();
            console.log("AI Data successfully received from backend:", result);
            setData(result);
        } catch (error) {
            console.error("CRITICAL FRONTEND UPLOAD ERROR:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const BAR_COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

    return (
        <div style={{
            backgroundColor: '#030712',
            backgroundImage: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.07), transparent 45%)',
            minHeight: '100vh',
            padding: '40px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            color: '#f8fafc'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                
                
                <div style={{ marginBottom: '32px', borderBottom: '1px solid #1e293b', paddingBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 12px #2563eb' }}></div>
                            <h1 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.02em', margin: 0, color: '#ffffff' }}>Meeting Tone Analyzer</h1>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>Workspace intelligence system executing computational linguistic and behavioral diagnostics.</p>
                    </div>
                    <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '600', backgroundColor: 'rgba(37, 99, 235, 0.12)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '4px 12px', borderRadius: '6px' }}>
                        {data ? "DATA MATRIX ACTIVE" : "SYSTEM STANDBY MODE"}
                    </div>
                </div>
                
               
                <div style={{ backgroundColor: '#0b1329', border: '1px dashed #1e293b', padding: '36px 24px', borderRadius: '12px', textAlign: 'center', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                    <label style={{ cursor: 'pointer', display: 'block' }}>
                        <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#ffffff', backgroundColor: '#2563eb', padding: '10px 20px', borderRadius: '6px', marginBottom: '4px', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)' }}>Select Transcript Log</span>
                        <span style={{ display: 'block', fontSize: '12px', color: '#475569', marginTop: '8px' }}>Supports structured standard plain text (.txt) files</span>
                        <input 
                            type="file" 
                            onChange={handleFileUpload} 
                            onClick={(e) => { e.target.value = null; }}
                            accept=".txt" 
                            style={{ display: 'none' }} 
                        />
                    </label>
                    {data && <div style={{ marginTop: '14px', display: 'inline-block', fontSize: '11px', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', color: '#10b981', fontWeight: '600' }}>✓ TRANSCRIPT PARSED SUCCESSFULLY</div>}
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#60a5fa' }}>
                        <div style={{ display: 'inline-block', width: '22px', height: '22px', border: '2px solid rgba(59, 130, 246, 0.1)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '12px' }}></div>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        <div style={{ fontSize: '13px', fontWeight: '500' }}>Parsing multi-channel computational metadata loops...</div>
                    </div>
                )}

                
                {!data && !loading && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                        <div style={{ padding: '24px', background: 'rgba(11, 19, 41, 0.4)', border: '1px solid #1e293b', borderRadius: '12px' }}>
                            <div style={{ fontSize: '20px', marginBottom: '12px' }}>📊</div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Behavioral Share Tracing</h4>
                            <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.5' }}>Maps raw dialogic densities dynamically across all speakers to monitor conversation dominance parameters.</p>
                        </div>
                        <div style={{ padding: '24px', background: 'rgba(11, 19, 41, 0.4)', border: '1px solid #1e293b', borderRadius: '12px' }}>
                            <div style={{ fontSize: '20px', marginBottom: '12px' }}>📈</div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Linguistic Sentiment Mapping</h4>
                            <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.5' }}>Calculates sequential conversational polarity tracks on a structural tracking curve from -5 to +5 mapping tone shifts.</p>
                        </div>
                        <div style={{ padding: '24px', background: 'rgba(11, 19, 41, 0.4)', border: '1px solid #1e293b', borderRadius: '12px' }}>
                            <div style={{ fontSize: '20px', marginBottom: '12px' }}>🛑</div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Anomaly Tracking Architecture</h4>
                            <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.5' }}>Isolates and logs absolute conversational exclusion patterns where team members are systematically ignored.</p>
                        </div>
                    </div>
                )}

                
                {data && (
                    <div style={{ animation: 'fadeIn 0.3s ease-out', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                            <div style={{ padding: '16px 20px', background: '#0b1329', borderRadius: '12px', border: '1px solid #1e293b' }}>
                                <h4 style={{ margin: 0, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>Health Score</h4>
                                <h1 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '700', color: data.meetingHealthScore > 60 ? '#10b981' : '#f43f5e' }}>{data.meetingHealthScore}<span style={{ fontSize: '12px', color: '#475569' }}>/100</span></h1>
                            </div>
                            <div style={{ padding: '16px 20px', background: '#0b1329', borderRadius: '12px', border: '1px solid #1e293b' }}>
                                <h4 style={{ margin: 0, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>Decision Alignment</h4>
                                <h1 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '700', color: '#3b82f6' }}>{data.decisionClarityScore}%</h1>
                            </div>
                            <div style={{ padding: '16px 20px', background: '#0b1329', borderRadius: '12px', border: '1px solid #1e293b' }}>
                                <h4 style={{ margin: 0, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>Tension Vectors</h4>
                                <h1 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '700', color: data.tensionPoints?.length > 0 ? '#ef9f27' : '#10b981' }}>{data.tensionPoints ? data.tensionPoints.length : 0}</h1>
                            </div>
                            <div style={{ padding: '16px 20px', background: '#0b1329', borderRadius: '12px', border: '1px solid #1e293b' }}>
                                <h4 style={{ margin: 0, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>Total Speakers</h4>
                                <h1 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '700', color: '#ffffff' }}>{data.speakerMetrics ? data.speakerMetrics.length : 0}</h1>
                            </div>
                        </div>

                       
                        <div style={{ padding: '20px 24px', background: '#0b1329', borderRadius: '12px', border: '1px solid #1e293b' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: '700', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Linguistic Extraction Analysis</h3>
                            <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: '1.65', margin: 0 }}>{data.summary}</p>
                        </div>

                       
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            
                            <div style={{ background: '#0b1329', border: '1px solid #1e293b', padding: '20px 24px', borderRadius: '12px' }}>
                                <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Speaker Talk Share Volume</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {data.speakerMetrics?.map((sp, idx) => (
                                        <div key={sp.name}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: '500', color: '#ffffff' }}>{sp.name} {sp.isIgnored && '⚠️'}</span>
                                                <span style={{ fontWeight: '600', color: '#60a5fa' }}>{sp.talkTimePercentage}%</span>
                                            </div>
                                            <div style={{ background: '#1c2541', borderRadius: '4px', height: '6px', width: '100%', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', borderRadius: '4px', width: `${sp.talkTimePercentage}%`, background: BAR_COLORS[idx % BAR_COLORS.length], boxShadow: `0 0 8px ${BAR_COLORS[idx % BAR_COLORS.length]}` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            
                            <div style={{ background: '#0b1329', border: '1px solid #1e293b', padding: '20px 24px', borderRadius: '12px' }}>
                                <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chronological Polarity Flow</p>
                                <div style={{ width: '100%', height: '142px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data.sentimentTimeline} margin={{ left: -30, right: 10, bottom: -10 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1c2541" vertical={false} opacity={0.4} />
                                            <XAxis dataKey="timestamp" stroke="#475569" style={{ fontSize: '10px', fontWeight: '500' }} tickLine={false} />
                                            <YAxis domain={[-5, 5]} stroke="#475569" style={{ fontSize: '10px', fontWeight: '500' }} tickLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', color: '#fff', fontSize: '11px', borderRadius: '6px' }} />
                                            <Line type="monotone" dataKey="sentimentScore" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#0b1329' }} activeDot={{ r: 5 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            
                            
                            <div style={{ background: '#0b1329', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
                                <h3 style={{ margin: '0 0 14px 0', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>Detected Friction Spots</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {data.tensionPoints && data.tensionPoints.length > 0 ? (
                                        data.tensionPoints.map((tp, idx) => (
                                            <div key={idx} style={{ padding: '10px', background: 'rgba(239, 159, 39, 0.05)', border: '1px solid #1e293b', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '11px', fontWeight: '600', color: '#ef9f27', background: 'rgba(239, 159, 39, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>{tp.timestamp || '00:00'}</span>
                                                <div style={{ fontSize: '12.5px', color: '#e2e8f0' }}>{tp.description}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ fontSize: '12px', color: '#475569', textAlign: 'center', padding: '20px 0' }}>No linguistic friction points tracked.</div>
                                    )}
                                </div>
                            </div>

                            
                            <div style={{ background: '#0b1329', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
                                <h3 style={{ margin: '0 0 14px 0', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>Operational Strategy Resolutions</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {data.decisions ? (
                                        data.decisions.map((dc, idx) => (
                                            <div key={idx} style={{ fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', padding: '4px 0' }}>
                                                <span style={{ color: '#3b82f6' }}>🔹</span> {dc.text || dc}
                                            </div>
                                        ))
                                    ) : (
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ fontSize: '12.5px', color: '#e2e8f0' }}><span style={{ color: '#10b981' }}>✓</span> Database structural scope mapped and confirmed.</div>
                                            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}><span style={{ color: '#ef9f27' }}>⚠️</span> Architectural connection parameters scaled; connection caches pending.</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        
                        <div style={{ background: '#0b1329', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
                            <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fine-Grained Computational Profiles</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                {data.speakerMetrics?.map((sm) => (
                                    <div key={sm.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderRight: '1px solid #1c2541', paddingRight: '10px' }}>
                                        <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>{sm.name}</p>
                                        <div style={{ fontSize: '11.5px', color: '#60a5fa' }}>Interrogatives Deployed: <span style={{ color: '#ffffff', fontWeight: '600' }}>{sm.questionsAsked || 0}</span></div>
                                        <div style={{ fontSize: '11.5px', color: sm.isIgnored ? '#f43f5e' : '#94a3b8' }}>
                                            Behavior Status: <span style={{ fontWeight: '600' }}>{sm.isIgnored ? 'System Ignored / Excluded' : 'Active Channel Participant'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}