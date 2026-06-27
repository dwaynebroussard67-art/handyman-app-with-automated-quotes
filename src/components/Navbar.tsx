import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, Phone } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { contact } = useContact();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/quote', label: 'Get a Quote' },
  ];

  const phoneHref = contact.phone ? `tel:${contact.phone.replace(/\D/g, '')}` : '#';

  return (
    <nav style={{ background: 'rgba(5,5,15,0.97)', borderBottom: '2px solid #c9a84c33', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1a3a8f, #e0157a)', borderRadius: '8px', padding: '7px', display: 'flex' }}>
            <Wrench size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: '0.08em', color: '#c9a84c', lineHeight: 1 }}>
              RYAN SUIRE
            </div>
            <div style={{ fontFamily: 'Oswald', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6b7280', textTransform: 'uppercase' }}>
              HANDYMAN • ABBEVILLE, LA
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }} className="hidden-mobile">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={phoneHref}
            style={{
              marginLeft: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Oswald',
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              color: '#fff',
              textDecoration: 'none',
              background: '#e0157a',
              padding: '0.45rem 1rem',
              borderRadius: '4px',
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#c01068')}
            onMouseLeave={e => (e.currentTarget.style.background = '#e0157a')}
          >
            <Phone size={14} />
            {contact.phone ? contact.phone : 'CALL RYAN'}
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
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Oswald',
                fontSize: '1.1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: location.pathname === l.to ? '#c9a84c' : '#d1d5db',
                textDecoration: 'none',
                padding: '0.7rem 0',
                borderBottom: '1px solid #1f2937',
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={phoneHref}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              fontFamily: 'Oswald',
              fontSize: '1rem',
              color: '#fff',
              textDecoration: 'none',
              background: '#e0157a',
              padding: '0.6rem 1.2rem',
              borderRadius: '4px',
              justifyContent: 'center',
            }}
          >
            <Phone size={16} />
            {contact.phone ? contact.phone : 'CALL RYAN'}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
