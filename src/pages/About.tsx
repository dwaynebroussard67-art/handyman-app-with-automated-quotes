import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const SWAMP_HERO = "https://images.pexels.com/photos/15283375/pexels-photo-15283375.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const WORKER_IMG = "https://images.pexels.com/photos/37556460/pexels-photo-37556460.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600";
const SWAMP3 = "https://images.pexels.com/photos/29333231/pexels-photo-29333231.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const WETLANDS = "https://images.pexels.com/photos/14603086/pexels-photo-14603086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const values = [
  {
    icon: '🐊',
    title: 'Born in the Mud',
    desc: 'South Louisiana raised. Vermilion Parish bred. Ryan knows what it means to work hard with what you have — and do it without complaining.',
    color: '#1a3a8f',
  },
  {
    icon: '🔥',
    title: 'Underdog Spirit',
    desc: 'Never counted out. Never quit. Every job Ryan takes is a statement — that quality work doesn\'t have to cost a fortune.',
    color: '#e0157a',
  },
  {
    icon: '💰',
    title: 'Fair Prices. Always.',
    desc: 'Half of what the shop charges. Not because the work is half as good — because Ryan believes in giving people a real break.',
    color: '#c9a84c',
  },
  {
    icon: '⚡',
    title: 'We Start Tonight',
    desc: 'When the deal is struck and the deposit is in, Ryan doesn\'t wait until next week. He shows up — often the same day.',
    color: '#8b0000',
  },
];

export default function About() {
  return (
    <div className="page-enter">

      {/* HERO BANNER */}
      <section style={{
        position: 'relative',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${SWAMP_HERO})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(5,5,15,0.9))' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="badge-underdog" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            🐊 THE MAN BEHIND THE WRENCH
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#fff', margin: 0, lineHeight: 0.95 }}>
            ABOUT <span className="neon-pink">RYAN</span>
          </h1>
          <p style={{ fontFamily: 'Oswald', fontSize: '1.1rem', color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            Abbeville, Louisiana • Vermilion Parish
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* STORY SECTION */}
      <section style={{ background: '#06060f', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-12px', left: '-12px',
              right: '12px', bottom: '12px',
              border: '2px solid #c9a84c55',
              borderRadius: '12px',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-12px', right: '-12px',
              left: '12px', top: '12px',
              border: '2px solid #e0157a33',
              borderRadius: '12px',
              zIndex: 0,
            }} />
            <div style={{ position: 'relative', zIndex: 1, borderRadius: '10px', overflow: 'hidden', border: '2px solid #1f2937' }}>
              <img src={WORKER_IMG} alt="Ryan Suire Handyman" style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                padding: '2rem 1.5rem 1.2rem',
              }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#c9a84c', letterSpacing: '0.08em' }}>RYAN SUIRE</div>
                <div style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Handyman • Entrepreneur • Abbeville, LA
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="badge-underdog" style={{ marginBottom: '1.2rem', display: 'inline-flex' }}>
              💪 GET IT OUT THE MUD
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', margin: '0 0 1.5rem', lineHeight: 1 }}>
              THE UNDERDOG<br /><span style={{ color: '#e0157a' }}>NEVER QUITS.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', color: '#d1d5db', fontFamily: 'Roboto', fontSize: '1rem', lineHeight: 1.8 }}>
              <p style={{ margin: 0 }}>
                Ryan Suire is a <strong style={{ color: '#c9a84c' }}>Abbeville, Louisiana</strong> native — raised in the heart of South Louisiana's bayou country where hard work isn't just a value, it's a way of life.
              </p>
              <p style={{ margin: 0 }}>
                Growing up in Vermilion Parish, Ryan learned early that if you want something done right, you do it yourself. That spirit of self-reliance, hustle, and <strong style={{ color: '#e0157a' }}>never backing down</strong> shaped every skill he carries.
              </p>
              <p style={{ margin: 0 }}>
                He started this handyman business with one mission: <strong style={{ color: '#c9a84c' }}>give hardworking people an affordable, reliable alternative</strong> to overpriced contractor shops. Half the commercial rate. No less quality. No excuses.
              </p>
              <p style={{ margin: 0 }}>
                Ryan's motto says it all — <em style={{ color: '#fff' }}>"If the price is right, we'll start tonight."</em> That's not marketing. That's a promise forged from grit, swamp water, and South Louisiana pride.
              </p>
            </div>

            {/* Contact placeholders */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: '#111827', border: '1px dashed #e0157a55', borderRadius: '8px' }}>
                <Phone size={18} color="#e0157a" />
                <div>
                  <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Phone</div>
                  <div style={{ fontFamily: 'Roboto', color: '#e0157a', fontSize: '0.95rem', fontStyle: 'italic' }}>[ Coming Soon — Fill In Later ]</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: '#111827', border: '1px dashed #c9a84c55', borderRadius: '8px' }}>
                <Mail size={18} color="#c9a84c" />
                <div>
                  <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email</div>
                  <div style={{ fontFamily: 'Roboto', color: '#c9a84c', fontSize: '0.95rem', fontStyle: 'italic' }}>[ Coming Soon — Fill In Later ]</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: '#111827', border: '1px solid #1a3a8f55', borderRadius: '8px' }}>
                <MapPin size={18} color="#1a6fff" />
                <div>
                  <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Location</div>
                  <div style={{ fontFamily: 'Roboto', color: '#d1d5db', fontSize: '0.95rem' }}>Abbeville, Louisiana (Vermilion Parish)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{
        position: 'relative',
        padding: '5rem 1.5rem',
        backgroundImage: `url(${SWAMP3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,2,15,0.9)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', margin: 0 }}>
              THE <span style={{ color: '#c9a84c' }}>CODE WE LIVE BY</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div key={i} style={{
                background: 'rgba(10,10,20,0.9)',
                border: `1px solid ${v.color}44`,
                borderTop: `4px solid ${v.color}`,
                borderRadius: '10px',
                padding: '2rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                  {v.title}
                </h3>
                <p style={{ color: '#9ca3af', fontFamily: 'Roboto', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAYOU PHOTO STRIP */}
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img src={WETLANDS} alt="South Louisiana Wetlands" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#c9a84c', letterSpacing: '0.15em', textAlign: 'center' }}>
            ABBEVILLE, LOUISIANA
          </div>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#9ca3af', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            VERMILION PARISH • BAYOU COUNTRY • SOUTH LOUISIANA
          </div>
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: '#06060f', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#fff', margin: '0 0 1rem' }}>
          READY TO <span style={{ color: '#e0157a' }}>WORK TOGETHER?</span>
        </h2>
        <p style={{ color: '#9ca3af', fontFamily: 'Roboto', fontSize: '1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Get your free quote. Describe your job. We'll tell you exactly what it costs — at half the commercial rate.
        </p>
        <Link to="/quote">
          <button className="hero-btn btn-pink">
            Get My Quote Now <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </button>
        </Link>
      </section>
    </div>
  );
}
