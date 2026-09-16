import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Sparkles, Moon, HelpCircle } from 'lucide-react';

export const AddTonightTargets: React.FC = () => {
  const { addTonightTargets, currentUser } = useForge();
  const navigate = useNavigate();

  const [inputLines, setInputLines] = useState(
    `Guidry Brothers Rice Dryer & Hauling, Kaplan, (337) 643-5590\nAcadiana Pressure Wash & Softwash, Abbeville, (337) 893-1122\nBayou Mobile Welding & Marine Rigging, Delcambre, (337) 685-4401`
  );
  const [sourceType, setSourceType] = useState<'auto' | 'self_sourced'>('self_sourced');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLines.trim()) return;

    addTonightTargets(inputLines, sourceType);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/queue');
    }, 1200);
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '800px', margin: '0 auto', color: '#f8fafc' }}>
      <Link
        to="/queue"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#94a3b8',
          textDecoration: 'none',
          fontSize: '0.85rem',
          fontFamily: 'Oswald',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem'
        }}
      >
        <ArrowLeft size={14} /> Back to Daily Queue
      </Link>

      <div style={{
        background: '#0b0f19',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Moon size={24} color="#38bdf8" />
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', margin: 0, color: '#fff', letterSpacing: '0.05em' }}>
            TONIGHT'S TARGETS INTAKE
          </h1>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Type business names or info before clocking off. These write rows into <code>targets</code> with <code>status: queued</code>. The scheduled 1:00 AM overnight job researches the business, generates their spec site, creates pitch notes, and leaves them <code>ready</code> in your morning queue.
        </p>

        {submitted ? (
          <div style={{
            background: 'rgba(16,185,129,0.15)',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#10b981',
            fontFamily: 'Oswald',
            fontSize: '1.2rem',
            letterSpacing: '0.05em'
          }}>
            ✓ TARGETS QUEUED FOR TONIGHT'S 1:00 AM BUILD RUN! Redirecting to queue...
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Source Selector */}
            <div>
              <label style={{ display: 'block', fontFamily: 'Oswald', fontSize: '0.9rem', color: '#c9a84c', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Pipeline Source Mode
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: sourceType === 'self_sourced' ? '#1e293b' : '#0f172a',
                  border: `1px solid ${sourceType === 'self_sourced' ? '#e0157a' : '#334155'}`,
                  borderRadius: '8px',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  flex: 1
                }}>
                  <input
                    type="radio"
                    name="sourceType"
                    checked={sourceType === 'self_sourced'}
                    onChange={() => setSourceType('self_sourced')}
                  />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>Self-Sourced (Recommended)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      You found them (flyers, truck trailers, signs). Skips cold research, builds spec site directly.
                    </div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: sourceType === 'auto' ? '#1e293b' : '#0f172a',
                  border: `1px solid ${sourceType === 'auto' ? '#38bdf8' : '#334155'}`,
                  borderRadius: '8px',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  flex: 1
                }}>
                  <input
                    type="radio"
                    name="sourceType"
                    checked={sourceType === 'auto'}
                    onChange={() => setSourceType('auto')}
                  />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>Auto Qualification</strong>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Applies Operator Playbook filter (established, review check, website check).
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#cbd5e1', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Business Names / Lines (One per line)
                </label>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Format: Business Name, City, Phone</span>
              </div>
              <textarea
                rows={7}
                required
                value={inputLines}
                onChange={e => setInputLines(e.target.value)}
                placeholder="Hebert Small Engine, Abbeville, (337) 555-1234&#10;Acadian Fencing, Kaplan&#10;Primeaux Marine, Delcambre"
                style={{
                  width: '100%',
                  background: '#111827',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Explanatory Callout */}
            <div style={{
              background: 'rgba(2,132,199,0.08)',
              border: '1px dashed #0284c766',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.85rem',
              color: '#94a3b8'
            }}>
              <strong style={{ color: '#38bdf8' }}>How Morning Delivery Works:</strong> Reps never see empty or half-built entries in their morning queue. Queued items are hidden until <code>ready</code>. At 8:00 AM, you log in and your 10 spec sites are warm and ready to pitch.
            </div>

            <button
              type="submit"
              style={{
                background: '#e0157a',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '12px',
                fontFamily: 'Oswald',
                fontSize: '1rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <PlusCircle size={18} /> Queue Targets for Tonight's Build Run
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
