import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import {
  KeyRound,
  ShieldCheck,
  UserCheck,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const AccessKeySwitcher: React.FC = () => {
  const { currentUser, users, switchUser, resetToDefaults } = useForge();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) return null;

  const roleBadgeColor = {
    admin: { bg: 'rgba(201,168,76,0.15)', text: '#c9a84c', border: '#c9a84c' },
    rep: { bg: 'rgba(16,185,129,0.15)', text: '#10b981', border: '#10b981' },
    trainee: { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa', border: '#3b82f6' }
  }[currentUser.role];

  return (
    <div style={{
      background: '#0a0d14',
      borderBottom: '1px solid #1f2937',
      padding: '0.5rem 1.5rem',
      position: 'relative',
      zIndex: 900
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.8rem'
      }}>
        {/* Left: Active Key Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            border: '1px solid #334155',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <KeyRound size={14} color="#c9a84c" />
            <span style={{ fontFamily: 'Oswald', fontSize: '0.75rem', letterSpacing: '0.08em', color: '#94a3b8' }}>
              KEY ACCESS:
            </span>
            <span style={{ fontFamily: 'Roboto', fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
              {currentUser.full_name}
            </span>
          </div>

          {/* Role Pill */}
          <span style={{
            background: roleBadgeColor.bg,
            color: roleBadgeColor.text,
            border: `1px solid ${roleBadgeColor.border}55`,
            borderRadius: '12px',
            padding: '2px 10px',
            fontFamily: 'Oswald',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {currentUser.role === 'admin' && <ShieldCheck size={12} />}
            {currentUser.role === 'rep' && <Briefcase size={12} />}
            {currentUser.role === 'trainee' && <GraduationCap size={12} />}
            {currentUser.role}
            {currentUser.role === 'trainee' && currentUser.training_status === 'training_complete' && (
              <span style={{ color: '#e0157a', fontWeight: 700, marginLeft: '4px' }}>
                (§5a COMPLETE)
              </span>
            )}
          </span>

          <span style={{ color: '#475569', fontSize: '0.75rem', fontFamily: 'Roboto' }} className="hidden-mobile">
            {currentUser.email}
          </span>
        </div>

        {/* Right: Quick Switcher Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {users.map(u => {
              const isSelected = u.id === currentUser.id;
              let roleIcon = <GraduationCap size={11} />;
              if (u.role === 'admin') roleIcon = <ShieldCheck size={11} />;
              if (u.role === 'rep') roleIcon = <Briefcase size={11} />;

              return (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  title={`${u.full_name} (${u.role}) — ${u.notes || ''}`}
                  style={{
                    background: isSelected ? '#1e293b' : '#0f172a',
                    border: `1px solid ${isSelected ? '#c9a84c' : '#334155'}`,
                    color: isSelected ? '#fff' : '#94a3b8',
                    borderRadius: '5px',
                    padding: '4px 8px',
                    fontFamily: 'Roboto',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s'
                  }}
                >
                  {roleIcon}
                  <span>{u.full_name.split(' ')[0]}</span>
                  {u.training_status === 'training_complete' && u.role === 'trainee' && (
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e0157a' }} />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (confirm('Reset demo state to original dossier defaults?')) {
                resetToDefaults();
              }
            }}
            title="Reset demo data to initial seed"
            style={{
              background: 'transparent',
              border: '1px solid #334155',
              color: '#64748b',
              borderRadius: '5px',
              padding: '4px 6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '0.7rem'
            }}
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
