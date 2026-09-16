import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import { Link } from 'react-router-dom';
import { CheckCircle2, Send, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const ApplyPage: React.FC = () => {
  const { submitApplication } = useForge();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salesExperience, setSalesExperience] = useState<'None' | 'Some' | 'Experienced'>('None');
  const [traits, setTraits] = useState<string[]>([
    'Self-motivated',
    'Coachable',
    'Persistent',
    'Honest'
  ]);
  const [availability, setAvailability] = useState('Immediately');
  const [why, setWhy] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const allTraits = [
    'Self-motivated',
    'Independent thinker',
    'Strong personal values',
    'Coachable',
    'Persistent',
    'Honest'
  ];

  const handleTraitToggle = (trait: string) => {
    if (traits.includes(trait)) {
      setTraits(traits.filter(t => t !== trait));
    } else {
      setTraits([...traits, trait]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !why) return;

    submitApplication({
      full_name: fullName,
      email,
      phone,
      sales_experience: salesExperience,
      traits,
      availability,
      why
    });

    setSubmitted(true);
  };

  return (
    <div style={{
      maxWidth: '620px',
      margin: '0 auto',
      padding: '3rem 1.5rem 5rem',
      color: '#1a1d1f'
    }}>
      {/* Light Paper styling matching Forge Mode public jobs portal */}
      <div style={{
        background: '#f6f4ef',
        border: '1px solid #d8d3c7',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          fontSize: '0.8rem',
          letterSpacing: '0.12em',
          fontWeight: 700,
          color: '#2c3a4a',
          textTransform: 'uppercase',
          marginBottom: '0.5rem'
        }}>
          FORGE MODE • SALES ADVISOR PIPELINE
        </div>

        <h1 style={{
          fontFamily: 'Bebas Neue',
          fontSize: '2.8rem',
          color: '#1a1d1f',
          lineHeight: 1.1,
          margin: '0 0 0.75rem',
          letterSpacing: '0.04em'
        }}>
          SALES REPRESENTATIVE APPLICATION
        </h1>

        <p style={{ color: '#5b5f62', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
          No experience required. We train you on our system, our way. Fill this out — takes about 2 minutes.
        </p>

        <div style={{
          borderLeft: '3px solid #c1502e',
          paddingLeft: '14px',
          marginBottom: '2rem',
          fontSize: '0.85rem',
          color: '#2c3a4a'
        }}>
          <strong>Note from D: </strong>
          <em>"It takes the exact same energy to look for what's good in a person as it does to look for what's broken. We concentrate on what's right."</em>
        </div>

        {submitted ? (
          <div style={{
            background: '#fff',
            border: '2px solid #10b981',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#1a1d1f', margin: '0 0 0.5rem' }}>
              APPLICATION RECEIVED!
            </h2>
            <p style={{ color: '#5b5f62', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              D reviews every applicant by hand. If approved, your Trainee account will be created and your private "key" access credentials will be delivered to <strong>{email}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Link
                to="/admin"
                style={{
                  background: '#2c3a4a',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontFamily: 'Oswald',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase'
                }}
              >
                Go to Admin View (Demo)
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1d1f', marginBottom: '4px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="First & Last Name"
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid #d8d3c7',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '0.95rem',
                  color: '#1a1d1f'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1d1f', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid #d8d3c7',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '0.95rem',
                  color: '#1a1d1f'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1d1f', marginBottom: '4px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(337) 000-0000"
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid #d8d3c7',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '0.95rem',
                  color: '#1a1d1f'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1d1f', marginBottom: '6px' }}>
                Prior Sales Experience
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['None', 'Some', 'Experienced'] as const).map(lvl => (
                  <label
                    key={lvl}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: salesExperience === lvl ? '#2c3a4a' : '#fff',
                      color: salesExperience === lvl ? '#fff' : '#1a1d1f',
                      border: '1px solid #d8d3c7',
                      borderRadius: '20px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    <input
                      type="radio"
                      name="salesExp"
                      checked={salesExperience === lvl}
                      onChange={() => setSalesExperience(lvl)}
                      style={{ display: 'none' }}
                    />
                    {lvl}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1d1f', marginBottom: '6px' }}>
                Which of these describe you?
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {allTraits.map(t => {
                  const isChecked = traits.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTraitToggle(t)}
                      style={{
                        background: isChecked ? '#c1502e' : '#fff',
                        color: isChecked ? '#fff' : '#1a1d1f',
                        border: '1px solid #d8d3c7',
                        borderRadius: '20px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1d1f', marginBottom: '4px' }}>
                When can you start?
              </label>
              <input
                type="text"
                required
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                placeholder="e.g. Immediately, 2 weeks notice"
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid #d8d3c7',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '0.95rem',
                  color: '#1a1d1f'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1d1f', marginBottom: '4px' }}>
                Why do you want this job?
              </label>
              <textarea
                rows={3}
                required
                value={why}
                onChange={e => setWhy(e.target.value)}
                placeholder="A few sentences is plenty — we're more interested in attitude than polish."
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid #d8d3c7',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '0.95rem',
                  color: '#1a1d1f',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: '#c1502e',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '14px',
                fontFamily: 'Oswald',
                fontSize: '1rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 600,
                marginTop: '0.5rem'
              }}
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
