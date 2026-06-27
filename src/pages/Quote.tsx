import { useState } from 'react';
import { ChevronRight, AlertTriangle, CheckCircle, DollarSign, Clock, Wrench } from 'lucide-react';

const SWAMP_HERO = "https://images.pexels.com/photos/26825662/pexels-photo-26825662.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

// Stripe publishable key placeholder — replace with your actual key in production
// const STRIPE_KEY = 'pk_test_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY';

// Commercial rate database (avg commercial pricing in South Louisiana area)
const JOB_PRICING: Record<string, { label: string; commercialRate: number; unit: string }> = {
  // Plumbing
  'plumbing_faucet': { label: 'Leaky Faucet Repair', commercialRate: 275, unit: 'job' },
  'plumbing_toilet': { label: 'Toilet Repair / Install', commercialRate: 450, unit: 'job' },
  'plumbing_drain': { label: 'Drain Unclogging', commercialRate: 320, unit: 'job' },
  'plumbing_pipe': { label: 'Pipe Repair', commercialRate: 500, unit: 'job' },
  'plumbing_water_heater': { label: 'Water Heater Install', commercialRate: 1200, unit: 'job' },
  // Electrical
  'electrical_fixture': { label: 'Light Fixture Install', commercialRate: 350, unit: 'fixture' },
  'electrical_fan': { label: 'Ceiling Fan Install', commercialRate: 380, unit: 'fan' },
  'electrical_outlet': { label: 'Outlet / Switch Replacement', commercialRate: 220, unit: 'outlet' },
  'electrical_gfci': { label: 'GFCI Outlet Install', commercialRate: 280, unit: 'outlet' },
  'electrical_thermostat': { label: 'Thermostat Install', commercialRate: 320, unit: 'job' },
  // Carpentry
  'carpentry_door': { label: 'Door Install / Repair', commercialRate: 400, unit: 'door' },
  'carpentry_window': { label: 'Window Repair', commercialRate: 360, unit: 'window' },
  'carpentry_cabinet': { label: 'Cabinet Repair / Install', commercialRate: 650, unit: 'job' },
  'carpentry_shelving': { label: 'Shelving Build & Install', commercialRate: 420, unit: 'job' },
  'carpentry_deck': { label: 'Deck Repair', commercialRate: 750, unit: 'job' },
  'carpentry_fence': { label: 'Fence Repair', commercialRate: 550, unit: 'section' },
  // Drywall / Painting
  'drywall_patch': { label: 'Drywall Patch & Repair', commercialRate: 450, unit: 'area' },
  'painting_interior': { label: 'Interior Painting (per room)', commercialRate: 650, unit: 'room' },
  'painting_exterior': { label: 'Exterior Painting (per section)', commercialRate: 750, unit: 'section' },
  'flooring_repair': { label: 'Flooring Repair', commercialRate: 500, unit: 'area' },
  // Exterior
  'exterior_pressure': { label: 'Pressure Washing', commercialRate: 420, unit: 'job' },
  'exterior_gutter': { label: 'Gutter Cleaning & Repair', commercialRate: 380, unit: 'job' },
  'exterior_roof_patch': { label: 'Roof Patch (minor)', commercialRate: 650, unit: 'job' },
  // Misc
  'misc_furniture': { label: 'Furniture Assembly', commercialRate: 200, unit: 'piece' },
  'misc_tv': { label: 'TV / Mounting', commercialRate: 200, unit: 'job' },
  'misc_appliance': { label: 'Appliance Installation', commercialRate: 320, unit: 'appliance' },
  'misc_junk': { label: 'Junk Removal / Hauling', commercialRate: 380, unit: 'load' },
  'custom': { label: 'Custom / Describe Below', commercialRate: 0, unit: 'custom' },
};

const JOB_CATEGORIES = [
  { label: '🚿 Plumbing', keys: ['plumbing_faucet','plumbing_toilet','plumbing_drain','plumbing_pipe','plumbing_water_heater'] },
  { label: '⚡ Electrical', keys: ['electrical_fixture','electrical_fan','electrical_outlet','electrical_gfci','electrical_thermostat'] },
  { label: '🪚 Carpentry', keys: ['carpentry_door','carpentry_window','carpentry_cabinet','carpentry_shelving','carpentry_deck','carpentry_fence'] },
  { label: '🏠 Drywall / Paint / Flooring', keys: ['drywall_patch','painting_interior','painting_exterior','flooring_repair'] },
  { label: '🌿 Exterior & Yard', keys: ['exterior_pressure','exterior_gutter','exterior_roof_patch'] },
  { label: '🛠️ Misc / Odd Jobs', keys: ['misc_furniture','misc_tv','misc_appliance','misc_junk','custom'] },
];

interface QuoteResult {
  jobType: string;
  jobLabel: string;
  qty: number;
  commercialTotal: number;
  ryanTotal: number;
  deposit: number;
  balance: number;
}

export default function Quote() {
  const [step, setStep] = useState<1|2|3>(1);
  const [selectedJob, setSelectedJob] = useState('');
  const [qty, setQty] = useState(1);
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [payLoading, setPayLoading] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [customEstimate, setCustomEstimate] = useState('');

  const handleGenerateQuote = () => {
    if (!selectedJob) return;
    const job = JOB_PRICING[selectedJob];
    let commercialTotal = 0;
    if (selectedJob === 'custom') {
      commercialTotal = parseFloat(customEstimate) || 0;
    } else {
      commercialTotal = job.commercialRate * qty;
    }
    const ryanTotal = Math.round(commercialTotal * 0.5);
    const deposit = Math.round(ryanTotal * 0.5);
    const balance = ryanTotal - deposit;
    setQuote({
      jobType: selectedJob,
      jobLabel: job.label,
      qty,
      commercialTotal,
      ryanTotal,
      deposit,
      balance,
    });
    setStep(2);
  };

  const handleContactSubmit = () => {
    if (!customerName || !customerPhone) return;
    setStep(3);
  };

  const handleStripePayment = async () => {
    if (!agreePolicy) {
      alert('Please agree to the deposit policy before proceeding.');
      return;
    }
    setPayLoading(true);
    // In production, this would call your backend to create a Stripe Checkout session
    // For now, we simulate the Stripe redirect
    alert(
      `🔗 Stripe Integration Ready!\n\n` +
      `In production, this button will:\n` +
      `1. Call your backend API\n` +
      `2. Create a Stripe Checkout session for $${quote?.deposit}\n` +
      `3. Redirect to Stripe's secure payment page\n\n` +
      `To activate: Replace the Stripe publishable key and connect your backend.\n\n` +
      `Deposit amount: $${quote?.deposit}`
    );
    setPayLoading(false);
  };

  return (
    <div className="page-enter">

      {/* HERO */}
      <section style={{
        position: 'relative', height: '340px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${SWAMP_HERO})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(5,5,15,0.95))' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="badge-underdog" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            💰 FREE INSTANT QUOTE
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: '#fff', margin: 0, lineHeight: 0.95 }}>
            GET YOUR <span style={{ color: '#c9a84c' }}>QUOTE</span>
          </h1>
          <p style={{ fontFamily: 'Oswald', color: '#9ca3af', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.8rem' }}>
            Half the commercial rate · Instant calculation · Secure Stripe deposit
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* STEP INDICATOR */}
      <div style={{ background: '#08080f', padding: '1.5rem', borderBottom: '1px solid #1f2937' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 0 }}>
          {[
            { n: 1, label: 'Select Job' },
            { n: 2, label: 'Your Info' },
            { n: 3, label: 'Pay Deposit' },
          ].map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: step >= s.n ? '#e0157a' : '#1f2937',
                  border: `2px solid ${step >= s.n ? '#e0157a' : '#374151'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Bebas Neue', fontSize: '1rem', color: '#fff',
                  flexShrink: 0,
                  transition: 'all 0.3s',
                }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span style={{ fontFamily: 'Oswald', fontSize: '0.85rem', color: step >= s.n ? '#c9a84c' : '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div style={{ flex: 1, height: '2px', background: step > s.n ? '#e0157a' : '#1f2937', margin: '0 0.5rem', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section style={{ background: '#06060f', padding: '3rem 1.5rem', minHeight: '60vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* ===== STEP 1: JOB SELECTION ===== */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: '#fff', margin: '0 0 0.5rem', letterSpacing: '0.06em' }}>
                STEP 1: <span style={{ color: '#c9a84c' }}>WHAT NEEDS FIXING?</span>
              </h2>
              <p style={{ color: '#9ca3af', fontFamily: 'Roboto', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                Select the job type below. We'll instantly calculate the commercial average price and show you Ryan's rate — exactly half.
              </p>

              {/* Job Type Selector */}
              {JOB_CATEGORIES.map((cat) => (
                <div key={cat.label} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#c9a84c', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem', paddingLeft: '0.5rem', borderLeft: '3px solid #c9a84c' }}>
                    {cat.label}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
                    {cat.keys.map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedJob(key)}
                        style={{
                          background: selectedJob === key ? 'rgba(224,21,122,0.15)' : '#111827',
                          border: `1px solid ${selectedJob === key ? '#e0157a' : '#374151'}`,
                          borderRadius: '8px',
                          padding: '0.7rem 1rem',
                          color: selectedJob === key ? '#fff' : '#9ca3af',
                          fontFamily: 'Oswald',
                          fontSize: '0.88rem',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>{JOB_PRICING[key].label}</span>
                        {JOB_PRICING[key].commercialRate > 0 && (
                          <span style={{ color: '#c9a84c', fontSize: '0.8rem', fontWeight: 600 }}>
                            ${Math.round(JOB_PRICING[key].commercialRate * 0.5)}+
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity & Custom */}
              {selectedJob && (
                <div style={{ background: '#0f172a', border: '1px solid #c9a84c44', borderRadius: '12px', padding: '1.8rem', marginTop: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'Oswald', fontSize: '1.1rem', color: '#c9a84c', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                    ✅ Selected: {JOB_PRICING[selectedJob].label}
                  </h3>

                  {selectedJob !== 'custom' ? (
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ fontFamily: 'Oswald', fontSize: '0.85rem', color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                        Quantity / Units ({JOB_PRICING[selectedJob].unit}s)
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => setQty(Math.max(1, qty - 1))}
                          style={{ background: '#1f2937', border: '1px solid #374151', color: '#fff', borderRadius: '6px', width: '36px', height: '36px', fontSize: '1.2rem', cursor: 'pointer' }}>
                          −
                        </button>
                        <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#fff', minWidth: '40px', textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => setQty(qty + 1)}
                          style={{ background: '#1f2937', border: '1px solid #374151', color: '#fff', borderRadius: '6px', width: '36px', height: '36px', fontSize: '1.2rem', cursor: 'pointer' }}>
                          +
                        </button>
                        <span style={{ color: '#6b7280', fontFamily: 'Roboto', fontSize: '0.85rem' }}>{JOB_PRICING[selectedJob].unit}(s)</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ fontFamily: 'Oswald', fontSize: '0.85rem', color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                        Estimated Commercial Cost ($) — What would a shop charge?
                      </label>
                      <input
                        type="number"
                        value={customEstimate}
                        onChange={e => setCustomEstimate(e.target.value)}
                        placeholder="e.g. 800"
                        style={{ background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: '6px', padding: '0.75rem 1rem', width: '200px', fontFamily: 'Roboto', fontSize: '1rem' }}
                      />
                      <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.4rem', fontFamily: 'Roboto' }}>
                        Don't know? Google "[your job] cost [your area]" — we'll go off that number.
                      </p>
                    </div>
                  )}

                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ fontFamily: 'Oswald', fontSize: '0.85rem', color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                      Describe the Job (Details help Ryan prepare)
                    </label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Tell us exactly what needs to be done. Location, materials, any specifics..."
                      rows={3}
                    />
                  </div>

                  {/* Live Preview */}
                  {(selectedJob !== 'custom' || customEstimate) && (
                    <div style={{
                      background: 'rgba(201,168,76,0.06)',
                      border: '1px solid #c9a84c44',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1.2rem',
                    }}>
                      <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#6b7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                        LIVE ESTIMATE PREVIEW
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                        <div>
                          <div style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#6b7280' }}>Commercial Shop Rate</div>
                          <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: '#6b7280', textDecoration: 'line-through' }}>
                            ${selectedJob === 'custom' ? parseFloat(customEstimate || '0') : JOB_PRICING[selectedJob].commercialRate * qty}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#c9a84c' }}>Ryan's Price (50% off)</div>
                          <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#c9a84c' }}>
                            ${Math.round((selectedJob === 'custom' ? parseFloat(customEstimate || '0') : JOB_PRICING[selectedJob].commercialRate * qty) * 0.5)}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#e0157a' }}>Deposit Required (50% of quote)</div>
                          <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: '#e0157a' }}>
                            ${Math.round((selectedJob === 'custom' ? parseFloat(customEstimate || '0') : JOB_PRICING[selectedJob].commercialRate * qty) * 0.25)}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#9ca3af' }}>Balance Due at Completion</div>
                          <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: '#9ca3af' }}>
                            ${Math.round((selectedJob === 'custom' ? parseFloat(customEstimate || '0') : JOB_PRICING[selectedJob].commercialRate * qty) * 0.25)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleGenerateQuote}
                    className="hero-btn btn-pink"
                    style={{ width: '100%', fontSize: '1.1rem' }}
                    disabled={selectedJob === 'custom' && !customEstimate}
                  >
                    Generate My Official Quote →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ===== STEP 2: CONTACT INFO + QUOTE DISPLAY ===== */}
          {step === 2 && quote && (
            <div>
              {/* Quote Card */}
              <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1a1a2e 100%)',
                border: '2px solid #c9a84c66',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  width: '120px', height: '120px',
                  background: 'radial-gradient(circle, rgba(224,21,122,0.15), transparent)',
                  borderRadius: '50%',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'linear-gradient(135deg, #1a3a8f, #e0157a)', borderRadius: '8px', padding: '8px', display: 'flex' }}>
                    <Wrench size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: '#c9a84c', letterSpacing: '0.08em' }}>
                      YOUR OFFICIAL QUOTE
                    </div>
                    <div style={{ fontFamily: 'Roboto', fontSize: '0.8rem', color: '#6b7280' }}>
                      Ryan Suire Handyman • Abbeville, Louisiana
                    </div>
                  </div>
                </div>

                <div style={{ fontFamily: 'Oswald', fontSize: '1.1rem', color: '#d1d5db', letterSpacing: '0.06em', marginBottom: '1.5rem', padding: '0.8rem 1rem', background: '#0a0a1a', borderRadius: '8px', border: '1px solid #1f2937' }}>
                  JOB: {quote.jobLabel.toUpperCase()} {quote.qty > 1 ? `(×${quote.qty})` : ''}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#0a0a1a', borderRadius: '10px', padding: '1.2rem', textAlign: 'center', border: '1px solid #1f2937' }}>
                    <div style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Commercial Shop Would Charge
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#4b5563', textDecoration: 'line-through', lineHeight: 1 }}>
                      ${quote.commercialTotal.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(201,168,76,0.08)', borderRadius: '10px', padding: '1.2rem', textAlign: 'center', border: '2px solid #c9a84c55' }}>
                    <div style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#c9a84c', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Ryan's Price (50% Off)
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem', color: '#c9a84c', lineHeight: 1 }}>
                      ${quote.ryanTotal.toLocaleString()}
                    </div>
                    <div style={{ fontFamily: 'Roboto', fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.2rem' }}>
                      YOU SAVE ${(quote.commercialTotal - quote.ryanTotal).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(224,21,122,0.1)', borderRadius: '10px', padding: '1.2rem', textAlign: 'center', border: '2px solid #e0157a66' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <DollarSign size={14} color="#e0157a" />
                      <span style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#e0157a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Deposit Required NOW
                      </span>
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#e0157a', lineHeight: 1 }}>
                      ${quote.deposit.toLocaleString()}
                    </div>
                    <div style={{ fontFamily: 'Roboto', fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.3rem' }}>
                      50% of quote — paid before Ryan arrives
                    </div>
                  </div>
                  <div style={{ background: '#0a0a1a', borderRadius: '10px', padding: '1.2rem', textAlign: 'center', border: '1px solid #1f2937' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <Clock size={14} color="#9ca3af" />
                      <span style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Balance at Completion
                      </span>
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#9ca3af', lineHeight: 1 }}>
                      ${quote.balance.toLocaleString()}
                    </div>
                    <div style={{ fontFamily: 'Roboto', fontSize: '0.7rem', color: '#6b7280', marginTop: '0.3rem' }}>
                      Remaining 50% — paid when job is done
                    </div>
                  </div>
                </div>

                {/* Deposit Policy Alert */}
                <div style={{
                  background: 'rgba(139,0,0,0.12)',
                  border: '1px solid #8b000066',
                  borderLeft: '4px solid #8b0000',
                  borderRadius: '8px',
                  padding: '1rem 1.2rem',
                  display: 'flex',
                  gap: '0.8rem',
                  alignItems: 'flex-start',
                }}>
                  <AlertTriangle size={18} color="#ff6b6b" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#ff6b6b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      Deposit Policy — Ryan Will NOT Show Up Without It
                    </div>
                    <p style={{ fontFamily: 'Roboto', fontSize: '0.85rem', color: '#d1d5db', margin: 0, lineHeight: 1.7 }}>
                      <strong>${quote.deposit.toLocaleString()}</strong> must be paid via Stripe before Ryan schedules or arrives at your location. Once the deposit is confirmed, Ryan will contact you to set the start time — often same day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#fff', margin: '0 0 0.5rem', letterSpacing: '0.06em' }}>
                STEP 2: <span style={{ color: '#c9a84c' }}>YOUR CONTACT INFO</span>
              </h2>
              <p style={{ color: '#9ca3af', fontFamily: 'Roboto', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Ryan needs to reach you after deposit is confirmed.
              </p>

              <div className="stripe-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                  <div>
                    <label>Full Name *</label>
                    <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Your full name" />
                  </div>
                  <div>
                    <label>Phone Number *</label>
                    <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="(337) 000-0000" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                  <div>
                    <label>Email Address</label>
                    <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label>Service Address</label>
                    <input type="text" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} placeholder="Your address in Louisiana" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => setStep(1)} className="hero-btn btn-gold" style={{ flex: 1, minWidth: '160px' }}>
                  ← Back
                </button>
                <button
                  onClick={handleContactSubmit}
                  className="hero-btn btn-pink"
                  style={{ flex: 2, minWidth: '200px' }}
                  disabled={!customerName || !customerPhone}
                >
                  Continue to Payment <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 3: STRIPE PAYMENT ===== */}
          {step === 3 && quote && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div className="badge-underdog" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                  🔒 SECURE STRIPE PAYMENT
                </div>
                <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', margin: '0.5rem 0' }}>
                  PAY YOUR <span style={{ color: '#c9a84c' }}>DEPOSIT</span>
                </h2>
              </div>

              {/* Summary */}
              <div style={{
                background: '#0f172a',
                border: '1px solid #c9a84c44',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
              }}>
                <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#6b7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  PAYMENT SUMMARY
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    { label: 'Customer', value: customerName },
                    { label: 'Phone', value: customerPhone },
                    { label: 'Service', value: quote.jobLabel },
                    { label: 'Total Quote', value: `$${quote.ryanTotal.toLocaleString()}` },
                    { label: 'Deposit Due Now (50%)', value: `$${quote.deposit.toLocaleString()}`, highlight: true },
                    { label: 'Balance at Completion', value: `$${quote.balance.toLocaleString()}` },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1f2937' }}>
                      <span style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {row.label}
                      </span>
                      <span style={{ fontFamily: row.highlight ? 'Bebas Neue' : 'Roboto', fontSize: row.highlight ? '1.4rem' : '1rem', color: row.highlight ? '#e0157a' : '#d1d5db', letterSpacing: row.highlight ? '0.05em' : 0 }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy Agreement */}
              <div style={{
                background: 'rgba(139,0,0,0.1)',
                border: '1px solid #8b000055',
                borderRadius: '10px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}>
                <h3 style={{ fontFamily: 'Oswald', fontSize: '1rem', color: '#ff6b6b', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.8rem' }}>
                  ⚠️ Deposit Policy — Read & Agree
                </h3>
                <ul style={{ color: '#d1d5db', fontFamily: 'Roboto', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.2rem', margin: '0 0 1rem' }}>
                  <li>The <strong style={{ color: '#e0157a' }}>50% deposit of ${quote.deposit}</strong> is required before Ryan will schedule or arrive at your location.</li>
                  <li>Once deposit is confirmed, Ryan will contact you to set the start time — often <strong style={{ color: '#c9a84c' }}>the same day or evening</strong>.</li>
                  <li>The remaining <strong>${quote.balance}</strong> is due upon successful job completion.</li>
                  <li>Deposits are non-refundable if you cancel after scheduling is confirmed.</li>
                </ul>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={agreePolicy}
                    onChange={e => setAgreePolicy(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#e0157a', cursor: 'pointer' }}
                  />
                  <span style={{ fontFamily: 'Oswald', fontSize: '0.9rem', color: '#d1d5db', letterSpacing: '0.05em' }}>
                    I understand and agree to the deposit policy above.
                  </span>
                </label>
              </div>

              {/* Stripe Button */}
              <div style={{
                background: 'linear-gradient(135deg, #0f172a, #1e1b4b11)',
                border: '1px solid #635bff55',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'Roboto', fontSize: '0.8rem', color: '#6b7280', marginBottom: '1rem', letterSpacing: '0.06em' }}>
                  🔒 SECURED BY STRIPE — YOUR PAYMENT INFORMATION IS ENCRYPTED
                </div>
                <button
                  onClick={handleStripePayment}
                  disabled={!agreePolicy || payLoading}
                  style={{
                    width: '100%',
                    background: agreePolicy ? 'linear-gradient(135deg, #635bff, #4c46d6)' : '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1.1rem',
                    color: agreePolicy ? '#fff' : '#6b7280',
                    fontFamily: 'Oswald',
                    fontSize: '1.1rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: agreePolicy ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    boxShadow: agreePolicy ? '0 4px 20px rgba(99,91,255,0.4)' : 'none',
                  }}
                >
                  {payLoading ? '⏳ Processing...' : `💳 Pay $${quote.deposit} Deposit via Stripe`}
                </button>
                <div style={{ fontFamily: 'Roboto', fontSize: '0.75rem', color: '#4b5563', marginTop: '0.8rem' }}>
                  Visa • Mastercard • Amex • Discover • Apple Pay • Google Pay
                </div>
              </div>

              {/* Stripe Setup Note */}
              <div style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px dashed #c9a84c44',
                borderRadius: '10px',
                padding: '1.2rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{ fontFamily: 'Oswald', fontSize: '0.85rem', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  🔧 Stripe Integration — Setup Instructions for Ryan
                </div>
                <ol style={{ color: '#9ca3af', fontFamily: 'Roboto', fontSize: '0.85rem', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
                  <li>Create a free account at <strong style={{ color: '#c9a84c' }}>stripe.com</strong></li>
                  <li>Get your Publishable Key from the Stripe Dashboard</li>
                  <li>Replace <code style={{ color: '#e0157a', background: '#0a0a1a', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY</code> in <code style={{ color: '#c9a84c', background: '#0a0a1a', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>src/pages/Quote.tsx</code></li>
                  <li>Set up a backend (Node.js or serverless) to create Checkout Sessions</li>
                  <li>Stripe handles all credit card processing securely — no card data touches your server</li>
                </ol>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setStep(2)} className="hero-btn btn-gold" style={{ flex: 1 }}>
                  ← Back
                </button>
              </div>

              {/* What Happens Next */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#0a0a1a', borderRadius: '10px', border: '1px solid #1f2937' }}>
                <h4 style={{ fontFamily: 'Oswald', fontSize: '1rem', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
                  ✅ What Happens After Payment?
                </h4>
                {[
                  'Stripe processes your secure deposit payment.',
                  'Ryan receives an instant notification with your job details.',
                  'Ryan contacts you within hours to confirm start time.',
                  'He shows up — ready to work. No delays, no excuses.',
                  'Job complete? Pay the remaining balance. Done.',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                    <CheckCircle size={16} color="#c9a84c" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontFamily: 'Roboto', fontSize: '0.9rem', color: '#d1d5db', lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
