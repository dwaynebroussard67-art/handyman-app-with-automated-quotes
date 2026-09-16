import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import {
  Layers,
  PlusCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
  FileCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const BuildRequest: React.FC = () => {
  const {
    currentUser,
    additionRequests,
    createAdditionRequest,
    updateAdditionStatus,
    sales
  } = useForge();

  const [siteName, setSiteName] = useState('');
  const [additionType, setAdditionType] = useState<'page' | 'feature' | 'custom'>('page');
  const [description, setDescription] = useState('');
  const [customPrice, setCustomPrice] = useState('350');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!currentUser) return null;

  // Reps see own requests; admin sees all
  const visibleAdditions = additionRequests.filter(a => {
    if (currentUser.role === 'admin') return true;
    return a.rep_id === currentUser.id;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteName.trim() || !description.trim()) return;

    createAdditionRequest({
      siteName,
      type: additionType,
      description,
      customPrice: additionType === 'custom' ? parseFloat(customPrice) || 350 : undefined
    });

    setSuccessMessage(true);
    setSiteName('');
    setDescription('');
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const getPriceAndCommission = () => {
    if (additionType === 'page') return { price: 75, repCommission: 18.75 };
    if (additionType === 'feature') return { price: 150, repCommission: 37.5 };
    const p = parseFloat(customPrice) || 0;
    return { price: p, repCommission: p * 0.25 };
  };

  const currentPricing = getPriceAndCommission();

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1280px', margin: '0 auto', color: '#f8fafc' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid #1f2937',
        paddingBottom: '1.5rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'Oswald',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: '4px'
          }}>
            <Layers size={16} /> Addition & Upsell Request Pipeline (§6)
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', margin: 0, letterSpacing: '0.06em', color: '#fff' }}>
            PAID ADDITION REQUESTS
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0', maxWidth: '650px' }}>
            Reuses the Forge Mode build engine. Standard catalog items auto-fill pricing. Custom features priced with 25% commission. Payment collects before build begins.
          </p>
        </div>

        {/* Pricing Catalog Quick Reference */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Oswald', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Page Addition</div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem', color: '#38bdf8' }}>$75 / $18.75 comm</div>
          </div>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Oswald', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Interactive Feature</div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem', color: '#e0157a' }}>$150 / $37.50 comm</div>
          </div>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Oswald', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Custom Build</div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem', color: '#c9a84c' }}>Quoted (25% comm)</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Submit Form, Right Pipeline Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>

        {/* Column 1: Submit Addition Request Form */}
        <div style={{
          background: '#0b0f19',
          border: '1px solid #1e293b',
          borderRadius: '14px',
          padding: '2rem',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <PlusCircle size={20} color="#e0157a" />
            <h2 style={{ fontFamily: 'Oswald', fontSize: '1.3rem', color: '#fff', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Request New Addition on Sold Site
            </h2>
          </div>

          {successMessage && (
            <div style={{
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid #10b981',
              borderRadius: '8px',
              padding: '12px',
              color: '#10b981',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={16} /> Addition request logged! Ready for payment collection.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontFamily: 'Roboto' }}>
                Client / Sold Site Name
              </label>
              <input
                type="text"
                required
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                placeholder="e.g. Broussard Backhoe Service"
                style={{
                  width: '100%',
                  background: '#111827',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontFamily: 'Roboto' }}>
                Addition Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {(['page', 'feature', 'custom'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAdditionType(type)}
                    style={{
                      background: additionType === type ? '#1e293b' : '#0f172a',
                      border: `1px solid ${additionType === type ? '#c9a84c' : '#334155'}`,
                      borderRadius: '6px',
                      padding: '8px',
                      color: additionType === type ? '#c9a84c' : '#94a3b8',
                      fontFamily: 'Oswald',
                      fontSize: '0.85rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {additionType === 'custom' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontFamily: 'Roboto' }}>
                  Custom Price Quote ($)
                </label>
                <input
                  type="number"
                  min="50"
                  step="25"
                  value={customPrice}
                  onChange={e => setCustomPrice(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#111827',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontFamily: 'Roboto' }}>
                Addition Scope & Description
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the page, feature, or custom request..."
                style={{
                  width: '100%',
                  background: '#111827',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Price Preview Card */}
            <div style={{
              background: '#0f172a',
              border: '1px dashed #334155',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'Oswald' }}>Client Price</div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: '#fff' }}>${currentPricing.price.toFixed(2)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'Oswald' }}>Your Commission (25%)</div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: '#10b981' }}>+${currentPricing.repCommission.toFixed(2)}</div>
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: '#e0157a',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '12px',
                fontFamily: 'Oswald',
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Submit Addition Request
            </button>
          </form>
        </div>

        {/* Column 2: Pipeline Tracker & Execution Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: 'Oswald', fontSize: '1.3rem', color: '#fff', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Active Additions Pipeline ({visibleAdditions.length})
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Rule: <code>payment_status: paid</code> gates <code>build_status: building</code>
            </span>
          </div>

          {visibleAdditions.map(item => {
            const isPaid = item.payment_status === 'paid';
            const isShipped = item.build_status === 'shipped';

            return (
              <div
                key={item.id}
                style={{
                  background: '#0b0f19',
                  border: `1px solid ${isShipped ? '#10b981' : isPaid ? '#0284c7' : '#334155'}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{
                        background: item.type === 'page' ? 'rgba(56,189,248,0.15)' : item.type === 'feature' ? 'rgba(224,21,122,0.15)' : 'rgba(201,168,76,0.15)',
                        color: item.type === 'page' ? '#38bdf8' : item.type === 'feature' ? '#f472b6' : '#c9a84c',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '0.7rem',
                        fontFamily: 'Oswald',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}>
                        {item.type}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Requested {new Date(item.requested_at).toLocaleDateString()}
                      </span>
                      {currentUser.role === 'admin' && (
                        <span style={{ color: '#c9a84c', fontSize: '0.75rem' }}>({item.rep_name})</span>
                      )}
                    </div>
                    <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: '#fff', margin: 0, letterSpacing: '0.04em' }}>
                      {item.site_name}
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: '#fff' }}>
                      ${item.price.toFixed(2)}
                    </div>
                    <div style={{ fontFamily: 'Oswald', fontSize: '0.75rem', color: '#10b981', letterSpacing: '0.05em' }}>
                      Commission: +${item.commission.toFixed(2)}
                    </div>
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {item.description}
                </p>

                {/* Status Badges & Pipeline Stages */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  borderTop: '1px solid #1e293b',
                  paddingTop: '0.75rem'
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {/* Payment Status Pill */}
                    <span style={{
                      background: isPaid ? 'rgba(16,185,129,0.15)' : 'rgba(201,168,76,0.15)',
                      color: isPaid ? '#10b981' : '#c9a84c',
                      border: `1px solid ${isPaid ? '#10b981' : '#c9a84c'}`,
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontFamily: 'Oswald',
                      textTransform: 'uppercase'
                    }}>
                      Payment: {item.payment_status}
                    </span>

                    {/* Build Status Pill */}
                    <span style={{
                      background:
                        item.build_status === 'shipped'
                          ? 'rgba(16,185,129,0.15)'
                          : item.build_status === 'building'
                          ? 'rgba(2,132,199,0.15)'
                          : 'rgba(100,116,139,0.15)',
                      color:
                        item.build_status === 'shipped'
                          ? '#10b981'
                          : item.build_status === 'building'
                          ? '#38bdf8'
                          : '#94a3b8',
                      border: '1px solid currentColor',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontFamily: 'Oswald',
                      textTransform: 'uppercase'
                    }}>
                      Build: {item.build_status}
                    </span>
                  </div>

                  {/* Interactive Admin / Rep Actions for Pipeline Demo */}
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {!isPaid && (
                      <button
                        onClick={() => {
                          updateAdditionStatus(item.id, { payment_status: 'paid' });
                        }}
                        style={{
                          background: '#10b981',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontFamily: 'Oswald',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          cursor: 'pointer'
                        }}
                      >
                        💳 Collect Stripe Payment (${item.price})
                      </button>
                    )}

                    {isPaid && item.build_status !== 'building' && item.build_status !== 'shipped' && (
                      <button
                        onClick={() => {
                          updateAdditionStatus(item.id, { build_status: 'building' });
                        }}
                        style={{
                          background: '#0284c7',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontFamily: 'Oswald',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          cursor: 'pointer'
                        }}
                      >
                        ⚙️ Start Build
                      </button>
                    )}

                    {isPaid && item.build_status === 'building' && (
                      <button
                        onClick={() => {
                          updateAdditionStatus(item.id, { build_status: 'shipped' });
                          alert(`Shipped! Commission of $${item.commission} paid out same day.`);
                        }}
                        style={{
                          background: '#e0157a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontFamily: 'Oswald',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          cursor: 'pointer'
                        }}
                      >
                        🚀 Ship & Payout Commission
                      </button>
                    )}

                    {isShipped && (
                      <span style={{ color: '#10b981', fontSize: '0.8rem', fontFamily: 'Oswald', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={14} /> Commission Paid Same Day
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
