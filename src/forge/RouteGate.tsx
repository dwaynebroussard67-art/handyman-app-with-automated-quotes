import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useForge } from './ForgeContext';
import { UserRole } from './types';
import { ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

interface RouteGateProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RouteGate: React.FC<RouteGateProps> = ({ allowedRoles, children }) => {
  const { currentUser } = useForge();

  if (!currentUser) {
    return (
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center', color: '#f8fafc' }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: '#0b0f19',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '2.5rem'
        }}>
          <KeyRound size={48} color="#c9a84c" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#fff', margin: '0 0 0.5rem' }}>
            KEY REQUIRED
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            This area requires an authorized Forge Mode key.
          </p>
          <Link
            to="/apply"
            style={{
              background: '#e0157a',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontFamily: 'Oswald',
              fontSize: '0.9rem',
              textTransform: 'uppercase'
            }}
          >
            Submit Application
          </Link>
        </div>
      </div>
    );
  }

  const hasAccess = allowedRoles.includes(currentUser.role);

  if (!hasAccess) {
    return (
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center', color: '#f8fafc' }}>
        <div style={{
          maxWidth: '540px',
          margin: '0 auto',
          background: '#0b0f19',
          border: '1px solid #ef444455',
          borderRadius: '14px',
          padding: '2.5rem'
        }}>
          <ShieldAlert size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#fff', margin: '0 0 0.5rem' }}>
            TIER RESTRICTED (§2 ACCESS GATE)
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Your account tier is <strong>{currentUser.role.toUpperCase()}</strong>.
            {currentUser.role === 'trainee' && (
              <span>
                {' '}Trainees can only access the <strong>Training Portal</strong> until finishing modules and passing the §5a live promotion call with D.
              </span>
            )}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/training"
              style={{
                background: '#c9a84c',
                color: '#000',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '6px',
                padding: '10px 18px',
                fontFamily: 'Oswald',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Go to Training Portal <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
