import { Link } from 'react-router-dom';
import { ChevronRight, Star, Phone } from 'lucide-react';

const SWAMP_BG = "https://images.pexels.com/photos/11573495/pexels-photo-11573495.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const SWAMP2 = "https://images.pexels.com/photos/458832/pexels-photo-458832.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const SWAMP3 = "https://images.pexels.com/photos/29333231/pexels-photo-29333231.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const WETLANDS = "https://images.pexels.com/photos/14603086/pexels-photo-14603086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const GATOR = "https://images.pexels.com/photos/38011230/pexels-photo-38011230.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const services = [
  { icon: '🔧', label: 'General Repairs', desc: 'From leaky faucets to busted doors, no job too small.' },
  { icon: '🪟', label: 'Doors & Windows', desc: 'Installation, repair, weatherproofing — done right.' },
  { icon: '⚡', label: 'Minor Electrical', desc: 'Light fixtures, outlets, switches & more.' },
  { icon: '🚿', label: 'Plumbing Fixes', desc: 'Stop those drips before they drain your wallet.' },
  { icon: '🏠', label: 'Home Improvement', desc: 'Drywall, painting, flooring, trim work — all of it.' },
  { icon: '🌿', label: 'Yard & Exterior', desc: 'Pressure washing, fence repair, outdoor upkeep.' },
  { icon: '🪚', label: 'Carpentry', desc: 'Custom builds, repairs, shelving, cabinets.' },
  { icon: '🛠️', label: 'Odd Jobs', desc: 'If it needs fixin\', Ryan will figure it out.' },
];

const testimonials = [
  { name: 'T. Broussard', city: 'Abbeville, LA', text: 'Ryan showed up the same night I called. Fixed my AC unit fast and didn\'t charge me an arm and a leg. Half price compared to the shop. Couldn\'t believe it.' },
  { name: 'M. Fontenot', city: 'Vermilion Parish, LA', text: 'This man has the work ethic of 10 guys. Got it out the mud for real. Would recommend him to anybody in South Louisiana.' },
  { name: 'J. Richard', city: 'Kaplan, LA', text: 'The price was right, so he started that night. Seriously, 9pm and he was already working. That\'s that underdog hustle.' },
];

export default function Home() {
  return (
    <div className="page-enter">

      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${SWAMP_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,20,0.5) 0%, rgba(10,10,20,0.85) 100%)',
        }} />

        {/* Decorative diagonal stripe */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '40%', height: '100%',
          background: 'linear-gradient(135deg, transparent 0%, rgba(26,58,143,0.08) 100%)',
          borderLeft: '1px solid rgba(201,168,76,0.1)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>

          <div className="badge-underdog" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            🐊 UNDERDOG SPIRIT • ABBEVILLE, LOUISIANA
          </div>

          <h1 style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            lineHeight: 0.95,
            marginBottom: '0.5rem',
            color: '#fff',
          }}>
            RYAN{' '}
            <span className="neon-pink">SUIRE</span>
          </h1>

          <h2 style={{
            fontFamily: 'Oswald',
            fontSize: 'clamp(1rem, 3vw, 1.6rem)',
            letterSpacing: '0.25em',
            color: '#c9a84c',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            fontWeight: 400,
          }}>
            Handyman • Entrepreneur • Abbeville, Louisiana
          </h2>

          <div style={{
            background: 'rgba(139,0,0,0.25)',
            border: '1px solid rgba(139,0,0,0.5)',
            borderLeft: '4px solid #8b0000',
            padding: '1rem 1.5rem',
            borderRadius: '6px',
            marginBottom: '2.5rem',
            display: 'inline-block',
          }}>
            <p style={{
              fontFamily: 'Bebas Neue',
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              color: '#fff',
              letterSpacing: '0.08em',
              margin: 0,
            }}>
              "IF THE PRICE IS RIGHT,{' '}
              <span style={{ color: '#c9a84c' }}>WE'LL START TONIGHT."</span>
            </p>
          </div>

          <p style={{
            color: '#d1d5db',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
            fontFamily: 'Roboto',
          }}>
            Born in the bayou. Built in the mud. South Louisiana's most determined
            handyman — giving you <strong style={{ color: '#e0157a' }}>commercial-quality work at half the price.</strong>
            No excuses. No delay. Just results.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote">
              <button className="hero-btn btn-pink">
                Get My Quote Now 🔥
              </button>
            </Link>
            <Link to="/about">
              <button className="hero-btn btn-gold">
                Meet Ryan
              </button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div style={{ marginTop: '4rem', color: '#4b5563', fontSize: '0.8rem', fontFamily: 'Oswald', letterSpacing: '0.15em' }}>
            ↓ SCROLL TO SEE MORE ↓
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* SLOGAN MARQUEE */}
      <div style={{ background: '#08080f', padding: '0.9rem 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid #c9a84c22' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 28s linear infinite' }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: 'Oswald', fontSize: '0.95rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase', marginRight: '4rem' }}>
              ⚡ If The Price Is Right, We'll Start Tonight &nbsp;•&nbsp; Get It Out The Mud &nbsp;•&nbsp; Underdog Spirit &nbsp;•&nbsp; Half Price. Full Quality. &nbsp;•&nbsp; Abbeville, Louisiana &nbsp;•
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* SERVICES PREVIEW */}
      <section style={{ background: '#06060f', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="badge-underdog" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              💪 WHAT WE DO
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', margin: '0.5rem 0' }}>
              NO JOB TOO <span style={{ color: '#e0157a' }}>TOUGH</span>
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: '540px', margin: '0 auto', fontFamily: 'Roboto', lineHeight: 1.8 }}>
              From the bayou to your backyard — Ryan handles it all, faster and cheaper than the competition.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
            {services.map((s, i) => (
              <div key={i} className="rust-card" style={{ padding: '1.5rem', borderRadius: '10px', transition: 'transform 0.2s, border-color 0.2s', cursor: 'default' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#c9a84c66';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#c9a84c33';
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'Oswald', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#c9a84c', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  {s.label}
                </h3>
                <p style={{ color: '#9ca3af', fontFamily: 'Roboto', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services">
              <button className="hero-btn btn-blue">
                See All Services <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW THE PRICING WORKS */}
      <section style={{
        position: 'relative', padding: '5rem 1.5rem',
        backgroundImage: `url(${SWAMP2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,2,15,0.88)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge-underdog" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              💰 THE DEAL
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', margin: '0.5rem 0' }}>
              <span style={{ color: '#c9a84c' }}>HALF THE PRICE.</span> ALL THE WORK.
            </h2>
            <p style={{ color: '#d1d5db', maxWidth: '600px', margin: '0 auto', fontFamily: 'Roboto', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Here's the deal: tell us what you need done, and we'll check what the commercial shop rate is.
              Ryan charges <strong style={{ color: '#e0157a' }}>half that price</strong> — with the same professionalism and zero shortcuts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                step: '01',
                color: '#1a3a8f',
                title: 'Describe Your Job',
                desc: 'Tell us exactly what needs fixing — plumbing, electrical, carpentry, whatever it is. Be specific.',
                icon: '📋',
              },
              {
                step: '02',
                color: '#c9a84c',
                title: 'We Price It Fair',
                desc: 'We look up the commercial shop rate for your job type. Your quote is exactly half that amount.',
                icon: '📊',
              },
              {
                step: '03',
                color: '#e0157a',
                title: 'Half Up Front',
                desc: '50% of the quote is paid before Ryan shows up. No exceptions. That\'s the code.',
                icon: '💳',
              },
              {
                step: '04',
                color: '#8b0000',
                title: 'We Start Tonight',
                desc: 'The price is right? We show up — could be same day, could be after dark. The job gets done.',
                icon: '🔧',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(10,10,20,0.85)',
                border: `1px solid ${item.color}55`,
                borderTop: `3px solid ${item.color}`,
                borderRadius: '10px',
                padding: '1.8rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: item.color, lineHeight: 1 }}>{item.step}</span>
                  <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'Oswald', fontSize: '1.1rem', color: '#fff', letterSpacing: '0.08em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontFamily: 'Roboto', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/quote">
              <button className="hero-btn btn-pink" style={{ fontSize: '1.2rem', padding: '1rem 2.8rem' }}>
                🔥 GET MY FREE QUOTE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', height: '260px', overflow: 'hidden' }}>
        {[SWAMP3, WETLANDS, GATOR].map((url, i) => (
          <div key={i} className="swamp-card" style={{ borderRadius: 0, border: 'none', height: '260px' }}>
            <img src={url} alt="South Louisiana" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 2 }}>
              <span style={{ fontFamily: 'Bebas Neue', fontSize: '0.9rem', color: '#c9a84c', letterSpacing: '0.15em' }}>
                {['BAYOU COUNTRY', 'SOUTH LOUISIANA', 'GATOR TERRITORY'][i]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <section style={{ background: '#08080f', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#fff', margin: 0 }}>
              STRAIGHT FROM THE <span style={{ color: '#e0157a' }}>PEOPLE</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, #0f172a, #111827)',
                border: '1px solid #c9a84c33',
                borderRadius: '12px',
                padding: '2rem',
              }}>
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} color="#c9a84c" fill="#c9a84c" />)}
                </div>
                <p style={{ color: '#d1d5db', fontFamily: 'Roboto', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.2rem', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ borderTop: '1px solid #1f2937', paddingTop: '1rem' }}>
                  <div style={{ fontFamily: 'Oswald', color: '#c9a84c', letterSpacing: '0.08em', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Roboto', color: '#6b7280', fontSize: '0.8rem' }}>{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3a8f 0%, #0a0a30 50%, #8b0000 100%)',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        borderTop: '3px solid #c9a84c44',
      }}>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', margin: '0 0 0.8rem' }}>
          READY TO GET IT <span style={{ color: '#c9a84c' }}>FIXED?</span>
        </h2>
        <p style={{ color: '#d1d5db', fontFamily: 'Oswald', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>
          DESCRIBE YOUR JOB. GET YOUR QUOTE. WE'LL START TONIGHT.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/quote">
            <button className="hero-btn btn-pink">
              🔥 Get My Quote
            </button>
          </Link>
          <a href="tel:+1XXXXXXXXXX">
            <button className="hero-btn btn-gold">
              <Phone size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
              Call Ryan
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
