import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Download,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Flame,
  AlertTriangle,
  Play,
  Plus,
  Clock,
  Sparkles,
  Lock,
  Unlock,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const RepQueue: React.FC = () => {
  const {
    currentUser,
    targets,
    downloadTargetPacket,
    logTargetOutcome,
    runOvernightPipelineSimulation,
    lastPipelineLog
  } = useForge();

  const [activeTab, setActiveTab] = useState<'queue' | 'history' | 'all'>('queue');
  const [outcomeModalTargetId, setOutcomeModalTargetId] = useState<string | null>(null);
  const [outcomeNotes, setOutcomeNotes] = useState('');
  const [selectedRepFilter, setSelectedRepFilter] = useState<string>('all');
  const [isSimulatingJob, setIsSimulatingJob] = useState(false);

  if (!currentUser) return null;

  // Reps only see ready/downloaded targets; admin can see everything
  const visibleTargets = targets.filter(t => {
    // Role filter
    if (currentUser.role === 'rep') {
      if (t.rep_id !== currentUser.id) return false;
      // Reps never see 'queued' or 'building' targets
      if (t.status === 'queued' || t.status === 'building') return false;
    } else if (currentUser.role === 'admin' && selectedRepFilter !== 'all') {
      if (t.rep_id !== selectedRepFilter) return false;
    }

    // Tab filter
    if (activeTab === 'queue') {
      return t.status === 'ready' || t.status === 'downloaded';
    } else if (activeTab === 'history') {
      return t.status === 'sold' || t.status === 'declined' || t.status === 'no_contact';
    }
    return true; // 'all'
  });

  const readyCount = targets.filter(t => (currentUser.role === 'admin' || t.rep_id === currentUser.id) && t.status === 'ready').length;
  const downloadedCount = targets.filter(t => (currentUser.role === 'admin' || t.rep_id === currentUser.id) && t.status === 'downloaded').length;
  const soldCount = targets.filter(t => (currentUser.role === 'admin' || t.rep_id === currentUser.id) && t.status === 'sold').length;
  const noContactCount = targets.filter(t => (currentUser.role === 'admin' || t.rep_id === currentUser.id) && t.status === 'no_contact').length;

  const handleSimulateOvernightJob = () => {
    setIsSimulatingJob(true);
    setTimeout(() => {
      const log = runOvernightPipelineSimulation();
      setIsSimulatingJob(false);
      alert(`Overnight Pipeline Executed!\n${log.processedCount} queued prospects converted to READY.\nUnworked targets rolled to no_contact.`);
    }, 600);
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto', color: '#f8fafc' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid #1f2937',
        paddingBottom: '1.5rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'Oswald',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: '4px'
          }}>
            <PhoneCall size={16} /> Daily Prospect Queue & Spec Site Pipeline
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', margin: 0, letterSpacing: '0.06em', color: '#fff' }}>
            DAILY CALL QUEUE
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0', maxWidth: '650px' }}>
            Overnight-built spec sites ready for pitching. Contact details unlock upon download commitment.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to="/queue/add-target"
            style={{
              background: '#e0157a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 16px',
              fontFamily: 'Oswald',
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={16} /> Submit Tonight's Targets
          </Link>

          {currentUser.role === 'admin' && (
            <button
              onClick={handleSimulateOvernightJob}
              disabled={isSimulatingJob}
              style={{
                background: 'linear-gradient(135deg, #1e3a8a, #0284c7)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 16px',
                fontFamily: 'Oswald',
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Play size={16} /> {isSimulatingJob ? 'Simulating 1 AM Job...' : 'Run 1 AM Overnight Job'}
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Ready To Call
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#38bdf8', marginTop: '2px' }}>
            {readyCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Overnight spec sites ready</div>
        </div>

        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Downloaded / In Play
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#c9a84c', marginTop: '2px' }}>
            {downloadedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Packets unlocked & calling</div>
        </div>

        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Sold Deals
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#10b981', marginTop: '2px' }}>
            {soldCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Closed with payment</div>
        </div>

        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Soft Marks (No Contact)
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#94a3b8', marginTop: '2px' }}>
            {noContactCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Capacity signal, zero penalty</div>
        </div>
      </div>

      {/* Queue Filter Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('queue')}
            style={{
              background: activeTab === 'queue' ? '#1e293b' : 'transparent',
              color: activeTab === 'queue' ? '#38bdf8' : '#94a3b8',
              border: `1px solid ${activeTab === 'queue' ? '#38bdf8' : '#334155'}`,
              borderRadius: '6px',
              padding: '6px 14px',
              fontFamily: 'Oswald',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Active Call Queue ({readyCount + downloadedCount})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              background: activeTab === 'history' ? '#1e293b' : 'transparent',
              color: activeTab === 'history' ? '#c9a84c' : '#94a3b8',
              border: `1px solid ${activeTab === 'history' ? '#c9a84c' : '#334155'}`,
              borderRadius: '6px',
              padding: '6px 14px',
              fontFamily: 'Oswald',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Logged Outcomes & History
          </button>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              background: activeTab === 'all' ? '#1e293b' : 'transparent',
              color: activeTab === 'all' ? '#fff' : '#94a3b8',
              border: `1px solid ${activeTab === 'all' ? '#64748b' : '#334155'}`,
              borderRadius: '6px',
              padding: '6px 14px',
              fontFamily: 'Oswald',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            All Targets
          </button>
        </div>

        {currentUser.role === 'admin' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Roboto' }}>Filter Rep:</span>
            <select
              value={selectedRepFilter}
              onChange={e => setSelectedRepFilter(e.target.value)}
              style={{
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#fff',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '0.85rem'
              }}
            >
              <option value="all">All Sales Reps</option>
              <option value="user-rep-marcus">Marcus Vance</option>
              <option value="user-trainee-caleb">Caleb Landry</option>
            </select>
          </div>
        )}
      </div>

      {/* Target Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {visibleTargets.length === 0 ? (
          <div style={{
            background: '#0f172a',
            border: '1px dashed #334155',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <p style={{ margin: 0, fontFamily: 'Roboto', fontSize: '1rem' }}>
              No targets found for this filter. Submit targets tonight before clocking off!
            </p>
          </div>
        ) : (
          visibleTargets.map(t => {
            const isDownloaded = t.status === 'downloaded' || t.status === 'sold' || t.status === 'declined';
            const isReadyOnly = t.status === 'ready';

            return (
              <div
                key={t.id}
                style={{
                  background: '#0b0f19',
                  border: `1px solid ${
                    t.status === 'ready'
                      ? '#0284c7'
                      : t.status === 'downloaded'
                      ? '#c9a84c'
                      : t.status === 'sold'
                      ? '#10b981'
                      : '#1e293b'
                  }`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: t.status === 'downloaded' ? '0 4px 20px rgba(201,168,76,0.08)' : 'none'
                }}
              >
                {/* Top Row: Business Name + Spec site link + Status Pill */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        background: t.source === 'self_sourced' ? 'rgba(224,21,122,0.15)' : 'rgba(56,189,248,0.15)',
                        color: t.source === 'self_sourced' ? '#f472b6' : '#38bdf8',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '0.7rem',
                        fontFamily: 'Oswald',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}>
                        {t.source === 'self_sourced' ? 'Self-Sourced' : 'Auto Research'}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                        {t.category} • {t.city}, {t.state}
                      </span>
                      {currentUser.role === 'admin' && t.rep_name && (
                        <span style={{ color: '#c9a84c', fontSize: '0.75rem', fontFamily: 'Roboto' }}>
                          (Assigned: {t.rep_name})
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', margin: 0, color: '#fff', letterSpacing: '0.04em' }}>
                      {t.business_name}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Spec Site Link (Always visible in ready queue) */}
                    <a
                      href={t.spec_site_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                        border: '1px solid #38bdf8',
                        color: '#38bdf8',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontFamily: 'Oswald',
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ExternalLink size={14} /> Spec Site Live Preview
                    </a>

                    {/* Status Pill */}
                    <span style={{
                      background:
                        t.status === 'ready'
                          ? 'rgba(2,132,199,0.15)'
                          : t.status === 'downloaded'
                          ? 'rgba(201,168,76,0.15)'
                          : t.status === 'sold'
                          ? 'rgba(16,185,129,0.15)'
                          : t.status === 'declined'
                          ? 'rgba(239,68,68,0.15)'
                          : 'rgba(100,116,139,0.15)',
                      color:
                        t.status === 'ready'
                          ? '#38bdf8'
                          : t.status === 'downloaded'
                          ? '#c9a84c'
                          : t.status === 'sold'
                          ? '#10b981'
                          : t.status === 'declined'
                          ? '#ef4444'
                          : '#94a3b8',
                      border: '1px solid currentColor',
                      borderRadius: '14px',
                      padding: '3px 10px',
                      fontFamily: 'Oswald',
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}>
                      {t.status}
                    </span>
                  </div>
                </div>

                {/* Gated Packet Section: Contact Info Hidden until Download Commitment */}
                {isReadyOnly ? (
                  <div style={{
                    background: 'rgba(2,132,199,0.06)',
                    border: '1px dashed #0284c766',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Lock size={20} color="#38bdf8" />
                      <div>
                        <div style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#f8fafc', letterSpacing: '0.05em' }}>
                          CONTACT DETAILS & PITCH SCRIPT LOCKED
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                          Tap download when you are ready to dial. This commits you to this target and records your engagement timestamp.
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => downloadTargetPacket(t.id)}
                      style={{
                        background: '#0284c7',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontFamily: 'Oswald',
                        fontSize: '0.85rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Download size={15} /> Download Full Packet & Unlock Contact
                    </button>
                  </div>
                ) : (
                  /* Unlocked Contact + Pitch Script Packet */
                  <div style={{
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {/* Unlocked Contact Details */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      borderBottom: '1px solid #1e293b',
                      paddingBottom: '0.75rem'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'Oswald' }}>Owner / Decision Maker</span>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{t.contact_info.owner_name}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'Oswald' }}>Direct Phone (Tap to Call)</span>
                        <div>
                          <a
                            href={`tel:${t.contact_info.phone.replace(/\D/g, '')}`}
                            style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}
                          >
                            📞 {t.contact_info.phone}
                          </a>
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'Oswald' }}>Direct Email</span>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{t.contact_info.email}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'Oswald' }}>Google Reputation</span>
                        <div style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>
                          ★ {t.contact_info.google_rating} ({t.contact_info.review_count} Reviews)
                        </div>
                      </div>
                    </div>

                    {/* AI Personalized Pitch Script from Operator Playbook */}
                    <div style={{ background: '#111827', borderRadius: '6px', padding: '1rem', borderLeft: '3px solid #c9a84c' }}>
                      <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#c9a84c', letterSpacing: '0.08em', marginBottom: '6px', textTransform: 'uppercase' }}>
                        🎯 Personalized Operator Pitch Packet
                      </div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div>
                          <strong style={{ color: '#fff' }}>Opening Hook: </strong>
                          <em>"{t.pitch_notes.hook}"</em>
                        </div>
                        <div>
                          <strong style={{ color: '#fff' }}>Existing Pain: </strong>
                          {t.pitch_notes.existing_pain}
                        </div>
                        <div>
                          <strong style={{ color: '#fff' }}>Phone Demo Angle: </strong>
                          {t.pitch_notes.demo_angle}
                        </div>
                        <div>
                          <strong style={{ color: '#fff' }}>Objection Prep: </strong>
                          {t.pitch_notes.objection_prep}
                        </div>
                        <div>
                          <strong style={{ color: '#fff' }}>Closing Script: </strong>
                          <span style={{ color: '#4ade80' }}>"{t.pitch_notes.close_script}"</span>
                        </div>
                      </div>
                    </div>

                    {/* Outcome Action Buttons (For Downloaded targets) */}
                    {t.status === 'downloaded' && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        paddingTop: '0.5rem'
                      }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                          Downloaded at {t.downloaded_at ? new Date(t.downloaded_at).toLocaleTimeString() : 'Today'}. Log outcome:
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => {
                              logTargetOutcome(t.id, 'sold');
                              alert(`CONGRATULATIONS! Deal closed for ${t.business_name}. $62.50 base commission credited to your account.`);
                            }}
                            style={{
                              background: '#10b981',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px 14px',
                              fontFamily: 'Oswald',
                              fontSize: '0.85rem',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <CheckCircle2 size={16} /> Sold ($250 Launch)
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Optional quick decline reason (e.g. retiring, hard pass, no answer):');
                              logTargetOutcome(t.id, 'declined', reason || undefined);
                            }}
                            style={{
                              background: '#334155',
                              color: '#cbd5e1',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px 14px',
                              fontFamily: 'Oswald',
                              fontSize: '0.85rem',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <XCircle size={16} /> Declined / Not Interested
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Logged Outcome Notes if completed */}
                    {(t.status === 'sold' || t.status === 'declined' || t.status === 'no_contact') && (
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #1e293b', paddingTop: '0.5rem' }}>
                        <strong>Outcome Recorded: </strong> {t.notes || `Flagged as ${t.status}.`}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
