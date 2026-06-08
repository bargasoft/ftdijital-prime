'use client';
import styles from './dashboard.module.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointerClick, Plus } from 'lucide-react';

const areaData = [
  { name: 'Pzt', visitors: 4000, clicks: 2400 },
  { name: 'Sal', visitors: 3000, clicks: 1398 },
  { name: 'Çar', visitors: 2000, clicks: 9800 },
  { name: 'Per', visitors: 2780, clicks: 3908 },
  { name: 'Cum', visitors: 1890, clicks: 4800 },
  { name: 'Cmt', visitors: 2390, clicks: 3800 },
  { name: 'Paz', visitors: 3490, clicks: 4300 },
];

const barData = [
  { name: 'Hizmetler', value: 400 },
  { name: 'Çözümler', value: 300 },
  { name: 'Blog', value: 300 },
  { name: 'İletişim', value: 200 },
];

export default function DashboardPage() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Performans Özeti</h1>
        <button className={styles.gradientButton}>
          <Plus size={18} />
          Hızlı İçerik Ekle
        </button>
      </header>

      {/* Stats Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Toplam Ziyaretçi</span>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}><Users size={20} /></div>
          </div>
          <div className={styles.statValue}>24,593</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <ArrowUpRight size={16} /> %12.5 bu hafta
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Sayfa Görüntülenmesi</span>
            <div className={`${styles.statIcon} ${styles.statIconPurple}`}><Eye size={20} /></div>
          </div>
          <div className={styles.statValue}>82,104</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <ArrowUpRight size={16} /> %8.2 bu hafta
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Etkileşim Oranı</span>
            <div className={`${styles.statIcon} ${styles.statIconPink}`}><MousePointerClick size={20} /></div>
          </div>
          <div className={styles.statValue}>%4.8</div>
          <div className={`${styles.statTrend} ${styles.trendDown}`}>
            <ArrowDownRight size={16} /> %1.1 bu hafta
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className={styles.chartsGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Trafik Analizi</h3>
          </div>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Sayfa İlgisi</h3>
          </div>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: 'rgba(226, 232, 240, 0.4)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
