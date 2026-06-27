import { Wrench, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContact } from '../context/ContactContext';

export default function Footer() {
  const { contact } = useContact();

  return (
    <footer style={{ background: '#02020a', borderTop: '4px solid #c9a84c44', marginTop: 0 }}>
      <div className="section-divider" />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #1a3a8f, #e0157a)', borderRadius: '8px', padding: '7px', display: 'flex' }}>
                <Wrench size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', color: '#c9a84c', lineHeight: 1 }}>RYAN SUIRE</div>
                <div style={{ fontFamily: 'Oswald', fontSize: '0.65rem', color: '#6b7280', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Handyman Services</div>
              </div>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              From the mud. Built on sweat. Fueled by the underdog spirit of South Louisiana.
            </p>
            <div style={{ fontFamily: 'Oswald', fontSize: '1.05rem', color: '#e0157a', letterSpacing: '0.06em', fontStyle: 'italic' }}>
              "If the price is right, we'll start tonight."
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', color: '#c9a84c', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              QUICK LINKS
            </h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Ryan' },
              { to: '/services', label: 'Services' },
              { to: '/quote', label: 'Get a Quote' },
            ].map(l => (
              <Link key={l.to} to={l.to}
                style={{ display: 'block', color: '#9ca3af', textDecoration: 'none', fontFamily: 'Oswald', fontSize: '0.95rem', letterSpacing: '0.08em', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
              >
                → {l.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', color: '#c9a84c', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/\D/g, '')}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#e0157a', textDecoration: 'none', fontFamily: 'Roboto', fontSize: '0.95rem' }}>
                  <Phone size={15} color="#e0157a" />
                  {contact.phone}
                </a>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Roboto', fontSize: '0.9rem' }}>
                  <Phone size={15} color="#e0157a" />
                  <span style={{ fontStyle: 'italic', color: '#e0157a', fontFamily: 'Oswald', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                    [ Phone — Coming Soon ]
                  </span>
                </div>
              )}

              {contact.email ? (
                <a href={`mailto:${contact.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#c9a84c', textDecoration: 'none', fontFamily: 'Roboto', fontSize: '0.95rem' }}>
                  <Mail size={15} color="#c9a84c" />
                  {contact.email}
                </a>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Roboto', fontSize: '0.9rem' }}>
                  <Mail size={15} color="#c9a84c" />
                  <span style={{ fontStyle: 'italic', color: '#c9a84c', fontFamily: 'Oswald', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                    [ Email — Coming Soon ]
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#9ca3af', fontFamily: 'Roboto', fontSize: '0.95rem' }}>
                <MapPin size={15} color="#1a6fff" />
                Abbeville, Louisiana (Vermilion Parish)
              </div>
            </div>
          </div>

          {/* Motto */}
          <div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', color: '#c9a84c', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              THE UNDERDOG CODE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Get it out the mud.', "Don't quit when you're down.", 'Blood, sweat, and grit.', 'Half up. We show up.', 'Built in Abbeville. Built to last.'].map((motto, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontFamily: 'Oswald', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                  <span style={{ color: '#8b0000', fontSize: '1rem' }}>▸</span>
                  {motto}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: '#4b5563', fontFamily: 'Roboto', fontSize: '0.8rem', margin: 0 }}>
            © {new Date().getFullYear()} Ryan Suire Handyman — Abbeville, Louisiana. All rights reserved.
          </p>
          <Link to="/admin" style={{ color: '#1f2937', fontFamily: 'Roboto', fontSize: '0.75rem', textDecoration: 'none', letterSpacing: '0.08em' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#374151')}
            onMouseLeave={e => (e.currentTarget.style.color = '#1f2937')}
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
