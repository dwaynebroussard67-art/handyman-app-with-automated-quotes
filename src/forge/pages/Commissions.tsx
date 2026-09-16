import React, { useState } from 'react';
import { useForge } from '../ForgeContext';
import {
  BadgeDollarSign,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  CreditCard
} from 'lucide-react';

export const Commissions: React.FC = () => {
  const { currentUser, sales, additionRequests, users } = useForge();
  const [selectedRepFilter, setSelectedRepFilter] = useState('all');

  if (!currentUser) return null;

  // Reps see own commissions; admin sees all
  const filteredSales = sales.filter(s => {
    if (currentUser.role === 'rep') return s.rep_id === currentUser.id;
    if (currentUser.role === 'admin' && selectedRepFilter !== 'all') {
      return s.rep_id === selectedRepFilter;
    }
    return true;
  });

  const filteredAdditions = additionRequests.filter(a => {
    if (currentUser.role === 'rep') return a.rep_id === currentUser.id;
    if (currentUser.role === 'admin' && selectedRepFilter !== 'all') {
      return a.rep_id === selectedRepFilter;
    }
    return true;
  });

  const totalBaseCommission = filteredSales.reduce((acc, s) => acc + s.commission_base, 0);
  const totalBonusCommission = filteredSales.reduce((acc, s) => acc + s.commission_bonus, 0);
  const totalAdditionCommission = filteredAdditions
    .filter(a => a.build_status === 'shipped' || a.payment_status === 'paid')
    .reduce((acc, a) => acc + a.commission, 0);

  const grandTotalCommission = totalBaseCommission + totalBonusCommission + totalAdditionCommission;

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
            <BadgeDollarSign size={16} /> Commission Ledger & Payout History
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', margin: 0, letterSpacing: '0.06em', color: '#fff' }}>
            {currentUser.role === 'admin' ? 'GLOBAL COMMISSION LEDGER' : 'MY COMMISSION HISTORY'}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0', maxWidth: '650px' }}>
            25% base commission on custom sales ($500 minimum, no cap — $125 min payout) + $50 same-day subscription upsell bonus + 25% on catalog additions. Paid same day!
          </p>
        </div>

        {currentUser.role === 'admin' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Filter Rep:</span>
            <select
              value={selectedRepFilter}
              onChange={e => setSelectedRepFilter(e.target.value)}
              style={{
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#fff',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.85rem'
              }}
            >
              <option value="all">All Sales Reps</option>
              <option value="user-rep-marcus">Marcus Vance</option>
              <option value="user-trainee-caleb">Caleb Landry</option>
            </select>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ background: '#0b0f19', border: '1px solid #10b98144', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Total Earned & Paid Out
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: '#10b981', marginTop: '2px' }}>
            ${grandTotalCommission.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Same-day payout via Stripe / ACH</div>
        </div>

        <div style={{ background: '#0b0f19', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Base Sale Commission
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: '#fff', marginTop: '2px' }}>
            ${totalBaseCommission.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>25% on $500 min custom sales ($125 min each, no cap)</div>
        </div>

        <div style={{ background: '#0b0f19', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Subscription Upsell Bonuses
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: '#c9a84c', marginTop: '2px' }}>
            ${totalBonusCommission.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>$50 same-day bonus per recurring service close</div>
        </div>

        <div style={{ background: '#0b0f19', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontFamily: 'Oswald', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Catalog Addition Commissions
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: '#e0157a', marginTop: '2px' }}>
            ${totalAdditionCommission.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>25% on pages, features & custom</div>
        </div>
      </div>

      {/* Closed Deals Table */}
      <div style={{
        background: '#0b0f19',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2.5rem'
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Custom Spec Site Sales ({filteredSales.length})
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>$500 Minimum Sale, No Cap</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', color: '#94a3b8', fontFamily: 'Oswald', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px' }}>Client</th>
                {currentUser.role === 'admin' && <th style={{ padding: '12px 16px' }}>Rep</th>}
                <th style={{ padding: '12px 16px' }}>Deal Amount</th>
                <th style={{ padding: '12px 16px' }}>Base Comm (25%)</th>
                <th style={{ padding: '12px 16px' }}>Sub Upsell Bonus</th>
                <th style={{ padding: '12px 16px' }}>Total Comm</th>
                <th style={{ padding: '12px 16px' }}>Payout Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => (
                <tr key={sale.id} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                    {new Date(sale.closed_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#f8fafc' }}>
                    {sale.customer_name}
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sale.customer_email}</div>
                  </td>
                  {currentUser.role === 'admin' && (
                    <td style={{ padding: '14px 16px', color: '#c9a84c', fontSize: '0.85rem' }}>
                      {sale.rep_name}
                    </td>
                  )}
                  <td style={{ padding: '14px 16px', color: '#fff' }}>${sale.amount.toFixed(2)}</td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8' }}>${sale.commission_base.toFixed(2)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {sale.subscription_upsell ? (
                      <span style={{ color: '#c9a84c', fontWeight: 600 }}>+$50.00</span>
                    ) : (
                      <span style={{ color: '#64748b' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#10b981', fontWeight: 700, fontFamily: 'Bebas Neue', fontSize: '1.25rem' }}>
                    ${sale.total_commission.toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: 'rgba(16,185,129,0.15)',
                      color: '#10b981',
                      border: '1px solid #10b981',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontFamily: 'Oswald',
                      textTransform: 'uppercase',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle2 size={12} /> Paid Same Day
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Addition Commissions Table */}
      <div style={{
        background: '#0b0f19',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Paid Addition & Upsell Commissions ({filteredAdditions.length})
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Trigger: Shipped = Same Day Payout</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', color: '#94a3b8', fontFamily: 'Oswald', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px' }}>Site / Client</th>
                <th style={{ padding: '12px 16px' }}>Type</th>
                <th style={{ padding: '12px 16px' }}>Addition Price</th>
                <th style={{ padding: '12px 16px' }}>Rep Commission (25%)</th>
                <th style={{ padding: '12px 16px' }}>Payment Status</th>
                <th style={{ padding: '12px 16px' }}>Build Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdditions.map(add => (
                <tr key={add.id} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                    {new Date(add.requested_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#f8fafc' }}>
                    {add.site_name}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: add.type === 'page' ? 'rgba(56,189,248,0.15)' : add.type === 'feature' ? 'rgba(224,21,122,0.15)' : 'rgba(201,168,76,0.15)',
                      color: add.type === 'page' ? '#38bdf8' : add.type === 'feature' ? '#f472b6' : '#c9a84c',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      fontSize: '0.75rem',
                      fontFamily: 'Oswald',
                      textTransform: 'uppercase'
                    }}>
                      {add.type}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#fff' }}>${add.price.toFixed(2)}</td>
                  <td style={{ padding: '14px 16px', color: '#10b981', fontWeight: 700, fontFamily: 'Bebas Neue', fontSize: '1.25rem' }}>
                    +${add.commission.toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      color: add.payment_status === 'paid' ? '#10b981' : '#c9a84c',
                      fontFamily: 'Oswald',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase'
                    }}>
                      ● {add.payment_status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      color: add.build_status === 'shipped' ? '#10b981' : add.build_status === 'building' ? '#38bdf8' : '#94a3b8',
                      fontFamily: 'Oswald',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase'
                    }}>
                      {add.build_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
