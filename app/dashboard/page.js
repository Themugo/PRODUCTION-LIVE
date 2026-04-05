// app/dashboard/page.js
import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import AnalyticsCard from '../../components/AnalyticsCard';
import AnalyticsChart from '../../components/AnalyticsChart';
import AdBoard from '../../components/AdBoard';
import CheckoutButton from '../../components/CheckoutButton';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [subscription, setSubscription] = useState({ plan: 'free' });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/dashboard', { cache: 'no-store' });
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  if (!data) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <>
      <AdBoard ads={[{ text: 'Upgrade to Pro!', link: '/pricing' }]} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
        {data.kpis.map((kpi, idx) => (
          <AnalyticsCard key={idx} title={kpi.title} value={kpi.value} trend={kpi.trend} />
        ))}
      </div>

      <AnalyticsChart data={data.chartData} title="Monthly Active Users Trend" />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px' }}>
        <Card
          title="📡 Devices"
          description="Monitor registered devices"
          buttons={data.devices.map(d => ({
            label: `${d.name} (${d.status})`,
            link: '/devices',
            icon: d.status === 'Active' ? '✅' : '⚠️',
          }))}
        />
        <Card
          title="👥 Users"
          description="Manage system users"
          buttons={data.users.map(u => ({
            label: `${u.name} (${u.role})`,
            link: '/users',
            icon: u.role === 'Admin' ? '⭐' : '👤',
          }))}
        />
      </div>

      {subscription.plan === 'free' && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#fef3c7',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          🌟 Upgrade to Premium to unlock Pro modules!
          <CheckoutButton plan="premium" />
        </div>
      )}
    </>
  );
}
