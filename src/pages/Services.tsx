import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SWAMP_HERO = "https://images.pexels.com/photos/11573495/pexels-photo-11573495.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const WETLANDS = "https://images.pexels.com/photos/14603086/pexels-photo-14603086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const serviceCategories = [
  {
    category: 'HOME REPAIRS',
    color: '#1a3a8f',
    icon: '🏠',
    services: [
      { name: 'Drywall Repair & Patching', commercialAvg: 400, ryanPrice: 200 },
      { name: 'Door Installation & Repair', commercialAvg: 350, ryanPrice: 175 },
      { name: 'Window Repair & Weatherproofing', commercialAvg: 300, ryanPrice: 150 },
      { name: 'Flooring Repair', commercialAvg: 500, ryanPrice: 250 },
      { name: 'Ceiling Repair', commercialAvg: 450, ryanPrice: 225 },
      { name: 'Interior Painting (per room)', commercialAvg: 600, ryanPrice: 300 },
    ],
  },
  {
    category: 'PLUMBING FIXES',
    color: '#e0157a',
    icon: '🚿',
    services: [
      { name: 'Leaky Faucet Repair', commercialAvg: 250, ryanPrice: 125 },
      { name: 'Running Toilet Fix', commercialAvg: 200, ryanPrice: 100 },
      { name: 'Drain Unclogging', commercialAvg: 300, ryanPrice: 150 },
      { name: 'Pipe Insulation', commercialAvg: 400, ryanPrice: 200 },
      { name: 'Toilet Installation', commercialAvg: 500, ryanPrice: 250 },
      { name: 'Showerhead Replacement', commercialAvg: 180, ryanPrice: 90 },
    ],
  },
  {
    category: 'MINOR ELECTRICAL',
    color: '#c9a84c',
    icon: '⚡',
    services: [
      { name: 'Light Fixture Installation', commercialAvg: 300, ryanPrice: 150 },
      { name: 'Ceiling Fan Install', commercialAvg: 350, ryanPrice: 175 },
      { name: 'Outlet / Switch Replacement', commercialAvg: 200, ryanPrice: 100 },
      { name: 'GFCI Outlet Install', commercialAvg: 250, ryanPrice: 125 },
      { name: 'Smart Thermostat Install', commercialAvg: 300, ryanPrice: 150 },
      { name: 'Smoke Detector Install', commercialAvg: 150, ryanPrice: 75 },
    ],
  },
  {
    category: 'CARPENTRY',
    color: '#8b0000',
    icon: '🪚',
    services: [
      { name: 'Cabinet Repair & Install', commercialAvg: 600, ryanPrice: 300 },
      { name: 'Shelving Build & Install', commercialAvg: 400, ryanPrice: 200 },
      { name: 'Deck Repair', commercialAvg: 700, ryanPrice: 350 },
      { name: 'Fence Repair', commercialAvg: 500, ryanPrice: 250 },
      { name: 'Trim & Molding Install', commercialAvg: 450, ryanPrice: 225 },
      { name: 'Stair Repair', commercialAvg: 550, ryanPrice: 275 },
    ],
  },
  {
    category: 'EXTERIOR & YARD',
    color: '#2d6a4f',
    icon: '🌿',
    services: [
      { name: 'Pressure Washing (house)', commercialAvg: 400, ryanPrice: 200 },
      { name: 'Gutter Cleaning & Repair', commercialAvg: 350, ryanPrice: 175 },
      { name: 'Roof Patch (minor)', commercialAvg: 600, ryanPrice: 300 },
      { name: 'Driveway Crack Sealing', commercialAvg: 300, ryanPrice: 150 },
      { name: 'Exterior Painting (per section)', commercialAvg: 700, ryanPrice: 350 },
      { name: 'Shed / Structure Repair', commercialAvg: 500, ryanPrice: 250 },
    ],
  },
  {
    category: 'ODD JOBS & MORE',
    color: '#6b7280',
    icon: '🛠️',
    services: [
      { name: 'Furniture Assembly', commercialAvg: 200, ryanPrice: 100 },
      { name: 'TV / Picture Mounting', commercialAvg: 180, ryanPrice: 90 },
      { name: 'Hauling & Junk Removal', commercialAvg: 350, ryanPrice: 175 },
      { name: 'Appliance Installation', commercialAvg: 300, ryanPrice: 150 },
      { name: 'Moving Assistance', commercialAvg: 400, ryanPrice: 200 },
      { name: 'Custom / Consult', commercialAvg: 0, ryanPrice: 0 },
    ],
  },
];

export default function Services() {
  return (
    <div className="page-enter">

      {/* HERO */}
      <section style={{
        position: 'relative', height: '380px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${SWAMP_HERO})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(5,5,15,0.9))' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="badge-underdog" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            🔧 WHAT RYAN DOES
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#fff', margin: 0, lineHeight: 0.95 }}>
            OUR <span style={{ color: '#c9a84c' }}>SERVICES</span>
          </h1>
          <p style={{ fontFamily: 'Oswald', fontSize: '1.1rem', color: '#9ca3af', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.8rem' }}>
            Commercial quality · Half the price · Same-day starts
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* PRICE PROMISE BANNER */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1a1a2e)', padding: '2.5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid #c9a84c22' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#c9a84c', margin: '0 0 1rem' }}>
            ⚡ THE HALF-PRICE GUARANTEE
          </h2>
          <p style={{ color: '#d1d5db', fontFamily: 'Roboto', lineHeight: 1.8, fontSize: '1rem', margin: '0 0 1rem' }}>
            Every price shown below is based on <strong style={{ color: '#e0157a' }}>50% of the current commercial average</strong> for that service in South Louisiana.
            No games, no hidden fees. You see the price — that's the price.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ background: '#111827', border: '1px solid #8b000055', borderRadius: '8px', padding: '0.8rem 1.5rem' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#8b0000' }}>50%</div>
              <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Off Commercial Rate</div>
            </div>
            <div style={{ background: '#111827', border: '1px solid #e0157a55', borderRadius: '8px', padding: '0.8rem 1.5rem' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#e0157a' }}>50%</div>
              <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Deposit Required Up Front</div>
            </div>
            <div style={{ background: '#111827', border: '1px solid #c9a84c55', borderRadius: '8px', padding: '0.8rem 1.5rem' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#c9a84c' }}>100%</div>
              <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Quality Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section style={{ background: '#06060f', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {serviceCategories.map((cat, ci) => (
            <div key={ci}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                <div>
                  <h2 style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '2rem',
                    color: '#fff',
                    margin: 0,
                    letterSpacing: '0.08em',
                    borderLeft: `4px solid ${cat.color}`,
                    paddingLeft: '0.8rem',
                  }}>
                    {cat.category}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {cat.services.map((svc, si) => (
                  <div key={si} style={{
                    background: 'linear-gradient(135deg, #0f172a, #111827)',
                    border: `1px solid ${cat.color}33`,
                    borderRadius: '10px',
                    padding: '1.3rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'border-color 0.2s, transform 0.2s',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${cat.color}88`;
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${cat.color}33`;
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)';
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'Oswald', fontSize: '1rem', color: '#e5e7eb', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                        {svc.name}
                      </div>
                      {svc.commercialAvg > 0 && (
                        <div style={{ fontFamily: 'Roboto', fontSize: '0.78rem', color: '#6b7280' }}>
                          Shops charge: <span style={{ textDecoration: 'line-through' }}>${svc.commercialAvg}</span>
                        </div>
                      )}
                    </div>
                    {svc.ryanPrice > 0 ? (
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: cat.color, letterSpacing: '0.05em', lineHeight: 1 }}>
                          ${svc.ryanPrice}
                        </div>
                        <div style={{ fontFamily: 'Roboto', fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          starting at
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#c9a84c', letterSpacing: '0.06em' }}>
                          CALL FOR QUOTE
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WETLANDS BANNER */}
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img src={WETLANDS} alt="South Louisiana" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', color: '#c9a84c', letterSpacing: '0.15em', textAlign: 'center' }}>
            "IF THE PRICE IS RIGHT, WE'LL START TONIGHT."
          </div>
        </div>
      </div>

      {/* DEPOSIT NOTICE */}
      <section style={{ background: '#06060f', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,0,0,0.15), rgba(224,21,122,0.08))',
            border: '1px solid #8b000066',
            borderLeft: '5px solid #8b0000',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2.5rem',
          }}>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#ff6b6b', letterSpacing: '0.08em', margin: '0 0 1rem' }}>
              ⚠️ DEPOSIT POLICY — NON-NEGOTIABLE
            </h3>
            <p style={{ color: '#d1d5db', fontFamily: 'Roboto', lineHeight: 1.8, margin: '0 0 0.8rem', fontSize: '1rem' }}>
              <strong style={{ color: '#fff' }}>Ryan will not show up to any job until 50% of the agreed quote has been paid.</strong> This is not a flexible policy — it is the foundation of how this business operates.
            </p>
            <p style={{ color: '#9ca3af', fontFamily: 'Roboto', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
              The deposit ensures both parties are committed. Once received, Ryan schedules immediately — often arriving the same day or evening. The remaining 50% is due upon job completion.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#fff', margin: '0 0 1rem' }}>
              DON'T SEE YOUR JOB? <span style={{ color: '#c9a84c' }}>GET A CUSTOM QUOTE.</span>
            </h3>
            <Link to="/quote">
              <button className="hero-btn btn-pink" style={{ fontSize: '1.1rem' }}>
                Request a Quote <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
