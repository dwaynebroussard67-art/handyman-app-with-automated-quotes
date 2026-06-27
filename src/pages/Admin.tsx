import { useState } from 'react';
import { useContact } from '../context/ContactContext';
import { CheckCircle, Settings } from 'lucide-react';

export default function Admin() {
  const { contact, updateContact } = useContact();
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [saved, setSaved] = useState(false);
  const [pass, setPass] = useState('');
  const [auth, setAuth] = useState(false);
  const [passError, setPassError] = useState(false);

  // Simple password gate (not production auth — just obfuscates admin panel)
  const ADMIN_PASS = 'ryansuire2025';

  const handleLogin = () => {
    if (pass === ADMIN_PASS) {
      setAuth(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleSave = () => {
    updateContact({ phone, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!auth) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{
          background: '#0f172a',
          border: '1px solid #c9a84c44',
          borderRadius: '16px',
          padding: '3rem',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#c9a84c', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>
            ADMIN ACCESS
          </h2>
          <p style={{ color: '#6b7280', fontFamily: 'Roboto', fontSize: '0.9rem', marginBottom: '2rem' }}>
            This page is for Ryan Suire only.
          </p>
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
            style={{
              background: '#111827',
              border: `1px solid ${passError ? '#8b0000' : '#374151'}`,
              color: '#f9fafb',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              width: '100%',
              fontFamily: 'Roboto',
              fontSize: '1rem',
              marginBottom: '0.8rem',
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}
          />
          {passError && (
            <p style={{ color: '#ff6b6b', fontFamily: 'Roboto', fontSize: '0.85rem', margin: '0 0 0.8rem' }}>
              Incorrect password. Try again.
            </p>
          )}
          <button onClick={handleLogin} className="hero-btn btn-blue" style={{ width: '100%' }}>
            Enter
          </button>
          <p style={{ color: '#374151', fontFamily: 'Roboto', fontSize: '0.75rem', marginTop: '1.5rem' }}>
            Default password: ryansuire2025 (change in code when ready)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ padding: '3rem 1.5rem', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
        <Settings size={28} color="#c9a84c" />
        <div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: '#fff', margin: 0, letterSpacing: '0.08em' }}>
            ADMIN SETTINGS
          </h1>
          <p style={{ color: '#6b7280', fontFamily: 'Roboto', fontSize: '0.85rem', margin: 0 }}>
            Update contact info — changes save to your browser instantly
          </p>
        </div>
      </div>

      <div style={{
        background: '#0f172a',
        border: '1px solid #c9a84c44',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1.5rem' }}>
          📞 Contact Information
        </h2>

        <div className="stripe-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="(337) 000-0000"
            />
            <p style={{ color: '#4b5563', fontFamily: 'Roboto', fontSize: '0.78rem', marginTop: '0.3rem' }}>
              This will appear on the website and "Call Now" buttons.
            </p>
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ryanshandyman@example.com"
            />
            <p style={{ color: '#4b5563', fontFamily: 'Roboto', fontSize: '0.78rem', marginTop: '0.3rem' }}>
              This will appear on the website and contact links.
            </p>
          </div>
        </div>

        <button onClick={handleSave} className="hero-btn btn-pink" style={{ width: '100%', marginTop: '1.5rem', fontSize: '1rem' }}>
          💾 Save Contact Info
        </button>

        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem', color: '#4ade80', fontFamily: 'Oswald', fontSize: '0.95rem', letterSpacing: '0.08em' }}>
            <CheckCircle size={18} color="#4ade80" />
            SAVED SUCCESSFULLY!
          </div>
        )}
      </div>

      <div style={{
        background: 'rgba(201,168,76,0.06)',
        border: '1px dashed #c9a84c44',
        borderRadius: '12px',
        padding: '1.5rem',
      }}>
        <h3 style={{ fontFamily: 'Oswald', fontSize: '1rem', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
          🔧 Current Live Values
        </h3>
        <div style={{ fontFamily: 'Roboto', fontSize: '0.9rem', color: '#9ca3af', lineHeight: 2 }}>
          <div><strong style={{ color: '#d1d5db' }}>Phone:</strong> {contact.phone || <em style={{ color: '#4b5563' }}>Not set yet</em>}</div>
          <div><strong style={{ color: '#d1d5db' }}>Email:</strong> {contact.email || <em style={{ color: '#4b5563' }}>Not set yet</em>}</div>
          <div><strong style={{ color: '#d1d5db' }}>Address:</strong> Abbeville, Louisiana</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#0a0a1a', borderRadius: '10px', border: '1px solid #1f2937' }}>
        <h3 style={{ fontFamily: 'Oswald', fontSize: '1rem', color: '#e0157a', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.8rem' }}>
          🔗 Stripe Setup Checklist
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { label: 'Create Stripe account at stripe.com', done: false },
            { label: 'Get your Publishable Key from Dashboard → Developers → API Keys', done: false },
            { label: 'Replace STRIPE_KEY value in src/pages/Quote.tsx', done: false },
            { label: 'Set up backend to create Checkout Sessions (Node.js/Serverless)', done: false },
            { label: 'Set up Stripe webhook to confirm payment before scheduling', done: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '3px', border: '2px solid #374151', background: item.done ? '#e0157a' : 'transparent', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontFamily: 'Roboto', fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.5 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
