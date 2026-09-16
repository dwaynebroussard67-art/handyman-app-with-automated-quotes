import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Gift,
  Video,
  ExternalLink,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';

export const EndOfTrainingSection: React.FC = () => {
  const {
    currentUser,
    gifts,
    submitTrainingGiftRequest,
    scheduleLiveCall,
    decideTraineePromotion
  } = useForge();

  const userGift = gifts.find(g => g.user_id === currentUser?.id);

  const [projectName, setProjectName] = useState(userGift?.business_or_project_name || '');
  const [projectDesc, setProjectDesc] = useState(userGift?.project_description || '');
  const [isSubmittingGift, setIsSubmittingGift] = useState(false);
  const [selectedCallDate, setSelectedCallDate] = useState('2026-09-18T14:00');
  const [isLiveCallActive, setIsLiveCallActive] = useState(false);

  const isComplete = currentUser?.training_status === 'training_complete' || currentUser?.role === 'rep';

  if (!currentUser) return null;

  const handleSaveGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    submitTrainingGiftRequest(projectName, projectDesc);
    setIsSubmittingGift(false);
  };

  const handleScheduleCall = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleLiveCall(selectedCallDate);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #13111c, #1f1424)',
      border: '2px solid #e0157a66',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '3rem',
      boxShadow: '0 10px 30px rgba(224,21,122,0.1)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #e0157a, #8b0000)',
            borderRadius: '10px',
            padding: '10px',
            display: 'flex'
          }}>
            <Award size={26} color="#fff" />
          </div>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Oswald',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#e0157a',
              marginBottom: '2px'
            }}>
              <Sparkles size={13} /> §5a End-of-Training Gate & Compensation
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#fff', margin: 0, letterSpacing: '0.05em' }}>
              LIVE PROMOTION CALL WITH D & FREE SPEC SITE ($250+ VALUE)
            </h2>
          </div>
        </div>

        {/* Status Pill */}
        <div style={{
          background: currentUser.training_status === 'promoted' || currentUser.role === 'rep'
            ? 'rgba(16,185,129,0.15)'
            : 'rgba(224,21,122,0.15)',
          border: `1px solid ${currentUser.role === 'rep' ? '#10b981' : '#e0157a'}`,
          borderRadius: '20px',
          padding: '6px 14px',
          fontFamily: 'Oswald',
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          color: currentUser.role === 'rep' ? '#10b981' : '#f472b6',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {currentUser.role === 'rep' ? (
            <>
              <CheckCircle2 size={16} /> PROMOTED TO REP (ACTIVE)
            </>
          ) : currentUser.training_status === 'training_complete' ? (
            <>
              <Clock size={16} /> ALL MODULES COMPLETE — CALL UNLOCKED
            </>
          ) : (
            <>
              <Clock size={16} /> IN TRAINING PROGRESS
            </>
          )}
        </div>
      </div>

      {/* Philosophy banner */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderLeft: '4px solid #c9a84c',
        borderRadius: '0 8px 8px 0',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        color: '#cbd5e1',
        fontSize: '0.9rem',
        lineHeight: 1.6
      }}>
        <strong style={{ color: '#c9a84c' }}>Guaranteed Compensation Policy: </strong>
        Completing training does not auto-promote you into the rep queue — it unlocks a live 1-on-1 call with D.
        <em> Either outcome, you are paid for completing training:</em> a real site is built for you for any business or personal project you choose ($250+ retail value) with full Forge Mode editor access. If approved, you keep the site and unlock the daily call queue!
      </div>

      {/* Grid: 2 columns (Left: Training Gift Site, Right: The Live Call) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

        {/* Column 1: The Free Site Intake & Status */}
        <div style={{
          background: '#0d111a',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Gift size={20} color="#e0157a" />
              <h3 style={{ fontFamily: 'Oswald', fontSize: '1.15rem', color: '#f8fafc', margin: 0, letterSpacing: '0.05em' }}>
                1. YOUR FREE SITE INTAKE ($250+ VALUE)
              </h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Tell us what business, ministry, church, side hustle, or family project you want built. Our automated launch engine builds it prior to the call so D hands it over live.
            </p>

            {userGift ? (
              <div style={{
                background: '#111827',
                border: '1px solid #10b98144',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Oswald', fontSize: '0.95rem', color: '#10b981', letterSpacing: '0.05em' }}>
                    ✓ SITE BUILT & READY
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'Roboto' }}>
                    {userGift.built_at ? new Date(userGift.built_at).toLocaleDateString() : 'Ready'}
                  </span>
                </div>
                <div style={{ fontFamily: 'Roboto', fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.25rem' }}>
                  {userGift.business_or_project_name}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  {userGift.project_description || 'Custom Forge Mode Spec Site with full interactive quote tooling.'}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a
                    href={userGift.spec_site_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#1e293b',
                      color: '#38bdf8',
                      border: '1px solid #0284c7',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontFamily: 'Oswald',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    View Preview <ExternalLink size={12} />
                  </a>
                  <span style={{
                    background: 'rgba(16,185,129,0.1)',
                    color: '#34d399',
                    border: '1px solid #10b98155',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    fontFamily: 'Oswald'
                  }}>
                    Editor Access: Granted
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveGift} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontFamily: 'Roboto' }}>
                    Project or Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    placeholder="e.g. Miller Lawn & Pressure Washing"
                    style={{
                      width: '100%',
                      background: '#111827',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontFamily: 'Roboto' }}>
                    Brief Description / Desired Services
                  </label>
                  <textarea
                    rows={2}
                    value={projectDesc}
                    onChange={e => setProjectDesc(e.target.value)}
                    placeholder="Residential driveways, soft wash siding, gutter cleans in Lafayette..."
                    style={{
                      width: '100%',
                      background: '#111827',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: '#e0157a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontFamily: 'Oswald',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '0.25rem'
                  }}
                >
                  Generate My Free Site & Lock In
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Column 2: Live Video Call with D & Decision Portal */}
        <div style={{
          background: '#0d111a',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Video size={20} color="#c9a84c" />
              <h3 style={{ fontFamily: 'Oswald', fontSize: '1.15rem', color: '#f8fafc', margin: 0, letterSpacing: '0.05em' }}>
                2. LIVE SCHEDULED VIDEO CALL WITH D
              </h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Join the live meeting room. D conducts this call personally to review mock calls, inspect your free site, and make the promotion decision.
            </p>

            {userGift?.call_scheduled_at ? (
              <div style={{
                background: '#111827',
                border: '1px solid #c9a84c55',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#c9a84c', letterSpacing: '0.05em' }}>
                    CALL CONFIRMED ON D'S CALENDAR
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {new Date(userGift.call_scheduled_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>

                {/* Simulated WebRTC Call Room Trigger */}
                <button
                  onClick={() => setIsLiveCallActive(!isLiveCallActive)}
                  style={{
                    width: '100%',
                    background: isLiveCallActive ? '#dc2626' : 'linear-gradient(135deg, #1e3a8a, #0284c7)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px',
                    fontFamily: 'Oswald',
                    fontSize: '0.9rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '0.5rem'
                  }}
                >
                  <Video size={16} />
                  {isLiveCallActive ? 'Leave Live Call Room' : 'Enter Live Video Call Room with D'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleScheduleCall} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontFamily: 'Roboto' }}>
                    Select Preferred Call Date & Time (UTC)
                  </label>
                  <input
                    type="datetime-local"
                    value={selectedCallDate}
                    onChange={e => setSelectedCallDate(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#111827',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: '#c9a84c',
                    color: '#000',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontFamily: 'Oswald',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Schedule Call with D
                </button>
              </form>
            )}

            {/* Embedded WebRTC Mock Video Stage when call is active */}
            {isLiveCallActive && (
              <div style={{
                marginTop: '1rem',
                background: '#020617',
                border: '1px solid #38bdf8',
                borderRadius: '8px',
                padding: '1rem',
                position: 'relative'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    background: '#1e293b',
                    borderRadius: '6px',
                    height: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #475569',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>👨‍💻</span>
                    <span style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#c9a84c', marginTop: '4px' }}>
                      Dwayne "D" Broussard (Host)
                    </span>
                    <span style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '8px',
                      background: 'rgba(0,0,0,0.6)',
                      color: '#4ade80',
                      fontSize: '0.65rem',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      ● Live
                    </span>
                  </div>

                  <div style={{
                    background: '#1e293b',
                    borderRadius: '6px',
                    height: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #475569',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>🎙️</span>
                    <span style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#93c5fd', marginTop: '4px' }}>
                      {currentUser.full_name} (Trainee)
                    </span>
                    <span style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '8px',
                      background: 'rgba(0,0,0,0.6)',
                      color: '#4ade80',
                      fontSize: '0.65rem',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      ● Connected
                    </span>
                  </div>
                </div>

                {/* D's In-Call Controls (Visible to Admin D or for testing) */}
                <div style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px dashed #c9a84c88',
                  borderRadius: '6px',
                  padding: '0.75rem'
                }}>
                  <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#c9a84c', marginBottom: '6px', letterSpacing: '0.08em' }}>
                    D'S IN-CALL PROMOTION TRIGGER (§5a)
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        decideTraineePromotion(currentUser.id, 'approve', 'Approved live on the call.');
                        alert(`${currentUser.full_name} has been APPROVED! Role flipped to Rep. Daily Queue unlocked.`);
                        setIsLiveCallActive(false);
                      }}
                      style={{
                        flex: 1,
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 10px',
                        fontFamily: 'Oswald',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✓ Approve Trainee → Rep
                    </button>
                    <button
                      onClick={() => {
                        decideTraineePromotion(currentUser.id, 'not_approve', 'Keep free site; not moving to rep queue.');
                        alert(`${currentUser.full_name} retains their free site as compensation. Rep queue remains closed.`);
                        setIsLiveCallActive(false);
                      }}
                      style={{
                        flex: 1,
                        background: '#64748b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 10px',
                        fontFamily: 'Oswald',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✕ Do Not Approve (Keep Free Site)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
