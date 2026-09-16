import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, Phone, GraduationCap, PhoneCall, Layers, BadgeDollarSign, ShieldCheck, UserPlus } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { useForge } from '../forge/ForgeContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { contact } = useContact();
  const { currentUser } = useForge();

  const userRole = currentUser?.role || 'applicant';

  const baseLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/quote', label: 'Get a Quote' },
  ];

  // Route map by role according to Dossier §7:
  // Trainee: /training
  // Rep: /training, /queue, /build-request, /commissions
  // Admin: /training, /queue, /build-request, /commissions, /admin
  const pipelineLinks = [
    {
      to: '/training',
      label: 'Training Portal',
      icon: <GraduationCap size={14} />,
      roles: ['trainee', 'rep', 'admin']
    },
    {
      to: '/queue',
      label: 'Daily Queue',
      icon: <PhoneCall size={14} />,
      roles: ['rep', 'admin']
    },
    {
      to: '/build-request',
      label: 'Additions',
      icon: <Layers size={14} />,
      roles: ['rep', 'admin']
    },
    {
      to: '/commissions',
      label: 'Commissions',
      icon: <BadgeDollarSign size={14} />,
      roles: ['rep', 'admin']
    },
    {
      to: '/admin',
      label: 'Admin Command',
      icon: <ShieldCheck size={14} />,
      roles: ['admin']
    }
  ];

  const allowedPipelineLinks = pipelineLinks.filter(l => l.roles.includes(userRole));

  const phoneHref = contact.phone ? `tel:${contact.phone.replace(/\D/g, '')}` : '#';

  return (
    <nav style={{ background: 'rgba(5,5,15,0.98)', borderBottom: '2px solid #c9a84c33', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1a3a8f, #e0157a)', borderRadius: '8px', padding: '7px', display: 'flex' }}>
            <Wrench size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: '0.08em', color: '#c9a84c', lineHeight: 1 }}>
              FORGE MODE
            </div>
            <div style={{ fontFamily: 'Oswald', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6b7280', textTransform: 'uppercase' }}>
              SALES PIPELINE • LAUNCH SYSTEM
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} className="hidden-mobile">
          {/* Public links */}
          {baseLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
              style={{ textDecoration: 'none', fontSize: '0.85rem' }}
            >
              {l.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: '1px', height: '20px', background: '#334155', margin: '0 0.5rem' }} />

          {/* Gated Pipeline Links by Role */}
          {allowedPipelineLinks.map(l => {
            const isActive = location.pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'Oswald',
                  fontSize: '0.85rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? '#c9a84c' : '#94a3b8',
                  textDecoration: 'none',
                  padding: '0.4rem 0.65rem',
                  borderRadius: '4px',
                  background: isActive ? '#1e293b' : 'transparent',
                  transition: 'all 0.15s'
                }}
              >
                {l.icon}
                {l.label}
              </Link>
            );
          })}

          {/* Public Application Link */}
          <Link
            to="/apply"
            style={{
              marginLeft: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Oswald',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              color: '#f8fafc',
              textDecoration: 'none',
              background: '#334155',
              padding: '0.4rem 0.75rem',
              borderRadius: '4px',
              fontWeight: 600
            }}
          >
            <UserPlus size={13} />
            Apply
          </Link>

          <a
            href={phoneHref}
            style={{
              marginLeft: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Oswald',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              color: '#fff',
              textDecoration: 'none',
              background: '#e0157a',
              padding: '0.4rem 0.85rem',
              borderRadius: '4px',
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
          >
            <Phone size={13} />
            {contact.phone ? contact.phone : 'CALL'}
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', padding: '0.4rem' }}
          className="show-mobile"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: '#05050f', padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid #c9a84c22' }}>
          {baseLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Oswald',
                fontSize: '1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: location.pathname === l.to ? '#c9a84c' : '#d1d5db',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid #1f2937',
              }}
            >
              {l.label}
            </Link>
          ))}

          <div style={{ padding: '0.6rem 0', color: '#c9a84c', fontFamily: 'Oswald', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Pipeline & Portal (Access: {userRole})
          </div>

          {allowedPipelineLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Oswald',
                fontSize: '1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: location.pathname.startsWith(l.to) ? '#c9a84c' : '#94a3b8',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid #1f2937',
              }}
            >
              {l.icon}
              {l.label}
            </Link>
          ))}

          <Link
            to="/apply"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Oswald',
              fontSize: '0.95rem',
              color: '#38bdf8',
              textDecoration: 'none',
              padding: '0.5rem 0'
            }}
          >
            <UserPlus size={15} /> Apply to Sales Team
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 869px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
