import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import {
  ShieldCheck,
  UserCheck,
  UserPlus,
  Play,
  RotateCcw,
  Sparkles,
  KeyRound,
  CheckCircle2,
  XCircle,
  Video,
  FileText,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    users,
    applications,
    createApprovedTraineeAccount,
    rejectApplication,
    runOvernightPipelineSimulation,
    lastPipelineLog,
    targets,
    sales,
    additionRequests,
    gifts,
    decideTraineePromotion
  } = useForge();

  const [activeTab, setActiveTab] = useState<'applicants' | 'end_of_training' | 'pipeline' | 'team'>('applicants');
  const [newTraineeEmail, setNewTraineeEmail] = useState('');
  const [isSimulatingJob, setIsSimulatingJob] = useState(false);

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#ff6b6b' }}>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>RESTRICTED ACCESS</h2>
        <p>This area is for D (Admin) only.</p>
      </div>
    );
  }

  const pendingApps = applications.filter(a => a.status === 'pending');
  const traineesAwaitingCall = gifts.filter(g => g.call_outcome === 'pending');

  const handleApproveApplicant = (appId: string) => {
    const createdUser = createApprovedTraineeAccount(appId, newTraineeEmail || undefined);
    setNewTraineeEmail('');
    alert(`Applicant APPROVED!\nTrainee account created for ${createdUser.full_name} (${createdUser.email}).\nTheir "key" access credentials have been issued.`);
  };

  const handleSimulateOvernightJob = () => {
    setIsSimulatingJob(true);
    setTimeout(() => {
      const log = runOvernightPipelineSimulation();
      setIsSimulatingJob(false);
      alert(`Overnight Scheduled Pipeline executed successfully!\nProcessed: ${log.processedCount} queued items.\nSoft marks updated.`);
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
            <ShieldCheck size={16} /> Admin Command — Dwayne "D" Broussard Only
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', margin: 0, letterSpacing: '0.06em', color: '#fff' }}>
            FORGE MODE MASTER COMMAND
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0', maxWidth: '650px' }}>
            Approve applicants by hand, conduct end-of-training promotion calls, supervise all rep queues, and trigger the 1:00 AM overnight target build pipeline.
          </p>
        </div>

        {/* Global Action Button */}
        <button
          onClick={handleSimulateOvernightJob}
          disabled={isSimulatingJob}
          style={{
            background: 'linear-gradient(135deg, #1e3a8a, #0284c7)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '12px 20px',
            fontFamily: 'Oswald',
            fontSize: '0.95rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(2,132,199,0.3)'
          }}
        >
          <Play size={18} /> {isSimulatingJob ? 'Running 1 AM Pipeline...' : 'Trigger 1 AM Scheduled Build Job'}
        </button>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('applicants')}
          style={{
            background: activeTab === 'applicants' ? '#1e293b' : 'transparent',
            color: activeTab === 'applicants' ? '#c9a84c' : '#94a3b8',
            border: `1px solid ${activeTab === 'applicants' ? '#c9a84c' : '#334155'}`,
            borderRadius: '6px',
            padding: '8px 16px',
            fontFamily: 'Oswald',
            fontSize: '0.85rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <UserPlus size={16} /> Pending Applicants ({pendingApps.length})
        </button>

        <button
          onClick={() => setActiveTab('end_of_training')}
          style={{
            background: activeTab === 'end_of_training' ? '#1e293b' : 'transparent',
            color: activeTab === 'end_of_training' ? '#e0157a' : '#94a3b8',
            border: `1px solid ${activeTab === 'end_of_training' ? '#e0157a' : '#334155'}`,
            borderRadius: '6px',
            padding: '8px 16px',
            fontFamily: 'Oswald',
            fontSize: '0.85rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Award size={16} /> §5a End-of-Training Calls ({traineesAwaitingCall.length})
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          style={{
            background: activeTab === 'pipeline' ? '#1e293b' : 'transparent',
            color: activeTab === 'pipeline' ? '#38bdf8' : '#94a3b8',
            border: `1px solid ${activeTab === 'pipeline' ? '#38bdf8' : '#334155'}`,
            borderRadius: '6px',
            padding: '8px 16px',
            fontFamily: 'Oswald',
            fontSize: '0.85rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Clock size={16} /> Overnight Pipeline Log
        </button>

        <button
          onClick={() => setActiveTab('team')}
          style={{
            background: activeTab === 'team' ? '#1e293b' : 'transparent',
            color: activeTab === 'team' ? '#fff' : '#94a3b8',
            border: `1px solid ${activeTab === 'team' ? '#64748b' : '#334155'}`,
            borderRadius: '6px',
            padding: '8px 16px',
            fontFamily: 'Oswald',
            fontSize: '0.85rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <UserCheck size={16} /> Active Team & Roster ({users.length})
        </button>
      </div>

      {/* Tab 1: Applicants Review & Manual Approval (§2 Flow) */}
      {activeTab === 'applicants' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'rgba(201,168,76,0.06)',
            borderLeft: '4px solid #c9a84c',
            padding: '1rem',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.9rem',
            color: '#cbd5e1'
          }}>
            <strong style={{ color: '#c9a84c' }}>Applicant Gate Protocol: </strong>
            Applicants who submit through the public form see <em>nothing</em> until D reviews them by hand. Clicking "Approve & Issue Key" creates their Trainee account and generates their login credentials. No account is created for anyone D doesn't approve.
          </div>

          {pendingApps.length === 0 ? (
            <div style={{ background: '#0b0f19', border: '1px solid #1e293b', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#64748b' }}>
              No pending applications at this time. All caught up!
            </div>
          ) : (
            pendingApps.map(app => (
              <div
                key={app.id}
                style={{
                  background: '#0b0f19',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#c9a84c', fontFamily: 'Oswald', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Submitted {new Date(app.submitted_at).toLocaleString()}
                    </span>
                    <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#fff', margin: '2px 0 4px', letterSpacing: '0.04em' }}>
                      {app.full_name}
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                      <span>✉️ {app.email}</span>
                      <span>📞 {app.phone || 'No phone provided'}</span>
                      <span>⏱️ Availability: {app.availability}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleApproveApplicant(app.id)}
                      style={{
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 18px',
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
                      <KeyRound size={16} /> Approve & Issue Key
                    </button>
                    <button
                      onClick={() => rejectApplication(app.id)}
                      style={{
                        background: '#334155',
                        color: '#cbd5e1',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 14px',
                        fontFamily: 'Oswald',
                        fontSize: '0.9rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >
                      Pass / Decline
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: '#1e293b', color: '#38bdf8', borderRadius: '4px', padding: '3px 8px', fontSize: '0.75rem', fontFamily: 'Oswald' }}>
                    Sales Experience: {app.sales_experience}
                  </span>
                  {app.traits.map((t, idx) => (
                    <span key={idx} style={{ background: 'rgba(224,21,122,0.15)', color: '#f472b6', borderRadius: '4px', padding: '3px 8px', fontSize: '0.75rem', fontFamily: 'Oswald' }}>
                      ✓ {t}
                    </span>
                  ))}
                </div>

                {/* Why This Job answer */}
                <div style={{ background: '#111827', borderRadius: '8px', padding: '1rem', borderLeft: '3px solid #e0157a' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'Oswald', marginBottom: '4px' }}>
                    Why They Want This Job:
                  </div>
                  <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5, fontStyle: 'italic' }}>
                    "{app.why}"
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: End-of-Training Live Promotion Decision (§5a) */}
      {activeTab === 'end_of_training' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(224,21,122,0.1), rgba(201,168,76,0.06))',
            borderLeft: '4px solid #e0157a',
            padding: '1.25rem',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.9rem',
            color: '#cbd5e1'
          }}>
            <strong style={{ color: '#e0157a' }}>§5a Live Call Protocol: </strong>
            During the live call, D clicks <strong>Approve</strong> or <strong>Do Not Approve</strong> in this view. This is the actual promotion trigger, not an automatic form. Either outcome, the trainee keeps their free custom site ($250+ value) with full editor access as guaranteed compensation for finishing training.
          </div>

          {gifts.map(g => {
            const trainee = users.find(u => u.id === g.user_id);
            if (!trainee) return null;

            return (
              <div
                key={g.id}
                style={{
                  background: '#0b0f19',
                  border: `1px solid ${g.call_outcome === 'approved' ? '#10b981' : g.call_outcome === 'not_approved' ? '#ef4444' : '#c9a84c'}`,
                  borderRadius: '12px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        background: g.call_outcome === 'approved' ? 'rgba(16,185,129,0.15)' : 'rgba(201,168,76,0.15)',
                        color: g.call_outcome === 'approved' ? '#10b981' : '#c9a84c',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontFamily: 'Oswald',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase'
                      }}>
                        Call Status: {g.call_outcome}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                        Trainee: <strong style={{ color: '#fff' }}>{trainee.full_name}</strong> ({trainee.email})
                      </span>
                    </div>

                    <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#fff', margin: 0, letterSpacing: '0.04em' }}>
                      Compensation Site: {g.business_or_project_name}
                    </h2>
                  </div>

                  {/* Promotion Trigger Actions for D */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        const note = prompt('Optional endorsement note for record:');
                        decideTraineePromotion(trainee.id, 'approve', note || undefined);
                        alert(`APPROVED! ${trainee.full_name} is now promoted to Rep role. Timestamp logged. Daily queue activated.`);
                      }}
                      style={{
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 16px',
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
                      <CheckCircle2 size={16} /> Approve & Promote to Rep
                    </button>

                    <button
                      onClick={() => {
                        const note = prompt('Reason note (trainee keeps free site):');
                        decideTraineePromotion(trainee.id, 'not_approve', note || undefined);
                        alert(`${trainee.full_name} marked as Not Approved. They retain their free site as guaranteed compensation.`);
                      }}
                      style={{
                        background: '#334155',
                        color: '#cbd5e1',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 14px',
                        fontFamily: 'Oswald',
                        fontSize: '0.85rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >
                      <XCircle size={16} /> Do Not Approve
                    </button>
                  </div>
                </div>

                <div style={{ background: '#111827', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'Oswald' }}>
                      Generated Compensation Site Preview:
                    </div>
                    <a
                      href={g.spec_site_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#38bdf8', fontSize: '0.9rem', fontFamily: 'monospace' }}
                    >
                      {g.spec_site_url}
                    </a>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid #10b98144', borderRadius: '4px', padding: '3px 8px', fontSize: '0.75rem', fontFamily: 'Oswald' }}>
                      Editor Access: Active
                    </span>
                    <span style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid #c9a84c44', borderRadius: '4px', padding: '3px 8px', fontSize: '0.75rem', fontFamily: 'Oswald' }}>
                      Value: $250.00
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Overnight Pipeline Log */}
      {activeTab === 'pipeline' && (
        <div style={{
          background: '#0b0f19',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'Oswald', fontSize: '1.3rem', color: '#fff', margin: 0, textTransform: 'uppercase' }}>
              Scheduled Overnight Target Pipeline (1:00 AM Cron)
            </h2>
            <button
              onClick={handleSimulateOvernightJob}
              style={{
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontFamily: 'Oswald',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Force Run Simulation
            </button>
          </div>

          <div style={{
            background: '#020617',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            padding: '1.25rem',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: '#38bdf8',
            maxHeight: '350px',
            overflowY: 'auto'
          }}>
            {lastPipelineLog ? (
              <div>
                <div style={{ color: '#4ade80', marginBottom: '8px' }}>
                  [EXECUTION TIMESTAMP: {new Date(lastPipelineLog.timestamp).toISOString()}]
                </div>
                {lastPipelineLog.details.map((line, idx) => (
                  <div key={idx} style={{ marginBottom: '4px', color: line.includes('SOFT MARK') ? '#fbbf24' : '#e2e8f0' }}>
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                [1:00 AM ENGINE READY] System idle. Targets submitted in "Tonight's Targets" will be picked up at 1:00 AM. Click "Force Run Simulation" above to test now.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Team & Roster */}
      {activeTab === 'team' && (
        <div style={{
          background: '#0b0f19',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b' }}>
            <h2 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', margin: 0, textTransform: 'uppercase' }}>
              All Platform Accounts & Key Holders ({users.length})
            </h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', color: '#94a3b8', fontFamily: 'Oswald', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>Name & Email</th>
                  <th style={{ padding: '12px 16px' }}>Role / Key Tier</th>
                  <th style={{ padding: '12px 16px' }}>Training Status</th>
                  <th style={{ padding: '12px 16px' }}>Approved At</th>
                  <th style={{ padding: '12px 16px' }}>Promoted To Rep</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #1f2937' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#f8fafc' }}>
                      {u.full_name}
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: u.role === 'admin' ? 'rgba(201,168,76,0.15)' : u.role === 'rep' ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)',
                        color: u.role === 'admin' ? '#c9a84c' : u.role === 'rep' ? '#10b981' : '#38bdf8',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontSize: '0.75rem',
                        fontFamily: 'Oswald',
                        textTransform: 'uppercase'
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                      {u.training_status}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                      {u.approved_at ? new Date(u.approved_at).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                      {u.promoted_to_rep_at ? new Date(u.promoted_to_rep_at).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
