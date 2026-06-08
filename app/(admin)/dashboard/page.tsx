'use client';
import styles from './dashboard.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, AlertCircle } from 'lucide-react';

const chartData = [
  { time: '00:00', today: 0, yesterday: 0 },
  { time: '02:00', today: 100, yesterday: 50 },
  { time: '04:00', today: 400, yesterday: 300 },
  { time: '06:00', today: 800, yesterday: 750 },
  { time: '08:00', today: 1200, yesterday: 900 },
  { time: '10:00', today: 2500, yesterday: 1800 },
  { time: '12:00', today: 3200, yesterday: 2900 },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Filters Row */}
      <div className={styles.tabsRow}>
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Tarih Seç <span style={{marginLeft:'5px'}}>▼</span></span>
        <button className={`${styles.tabBtn} ${styles.tabBtnActive}`}>BUGÜN</button>
        <button className={styles.tabBtn}>7 GÜN</button>
        <button className={styles.tabBtn}>30 GÜN</button>
        <button className={styles.tabBtn}>3 AY</button>
        <button className={styles.tabBtn}>6 AY</button>
        <button className={styles.tabBtn}>12 AY</button>
      </div>

      {/* Stats Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ border: '1px solid #3b82f6', borderLeftWidth: '4px' }}>
          <div className={styles.statTitle}>Toplam Ziyaretçi</div>
          <div className={styles.statValue}>24,593</div>
          <div className={styles.statSub}>Aktif Kullanıcı Oturumları</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Sayfa Görüntülenmesi</div>
          <div className={styles.statValue} style={{color: '#1e293b'}}>82,104</div>
          <div className={styles.statSub}>Toplam Sayfa İçi Gezinme</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTitle}>Form Doldurma</div>
          <div className={styles.statValue} style={{color: '#1e293b'}}>145</div>
          <div className={styles.statSub}>Tamamlanan İletişim Formları</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTitle}>Dönüşüm Oranı</div>
          <div className={styles.statValue} style={{color: '#1e293b'}}>%4.8</div>
          <div className={styles.statSub}>Ziyaretçi Dönüşüm Oranı</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className={styles.chartsGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader} style={{display: 'flex', justifyContent: 'space-between'}}>
            Trafik Akışı
            <div style={{fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: '1rem', alignItems: 'center'}}>
               <span style={{display:'flex', alignItems:'center', gap:'0.25rem'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#3b82f6'}}></div> Bugün</span>
               <span style={{display:'flex', alignItems:'center', gap:'0.25rem'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#94a3b8'}}></div> Dün</span>
            </div>
          </div>
          <div style={{ height: 350, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={{stroke: '#e2e8f0'}} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="today" stroke="#3b82f6" strokeWidth={2} dot={{r: 4, fill: '#3b82f6', strokeWidth: 0}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="yesterday" stroke="#94a3b8" strokeWidth={2} dot={{r: 4, fill: '#94a3b8', strokeWidth: 0}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Performans / Büyüme Önerileri
            <div style={{fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', fontWeight: 400}}>
              Sektörünüz ve sistem verileri ile derlediğimiz öneriler.
            </div>
          </div>
          <div className={styles.adviceList}>
            <div className={styles.adviceItem}>
              <div className={styles.adviceIcon}><Sparkles size={16} /></div>
              <div className={styles.adviceContent}>
                <h4>Yeni Hizmetlerinizi Tanıtın!</h4>
                <p>Eklediğiniz son 2 hizmet sayfanız yeterince trafik almıyor, Slider üzerinden öne çıkarabilirsiniz.</p>
              </div>
            </div>

            <div className={`${styles.adviceItem} ${styles.adviceItemDark}`}>
              <div className={styles.adviceIcon}><Sparkles size={16} /></div>
              <div className={styles.adviceContent}>
                <h4>Trafiğinizi Artıracak Blog İçeriklerini Keşfedin!</h4>
                <p>Sektörünüze özel daha fazla müşteriye ulaşmanızı sağlayacak blog fikirlerini sizin için derledik.</p>
              </div>
            </div>

            <div className={styles.adviceItem}>
              <div className={styles.adviceIcon} style={{color: '#ef4444'}}><AlertCircle size={16} /></div>
              <div className={styles.adviceContent}>
                <h4>Eksik İletişim Bilgileri</h4>
                <p>Site ayarlarınızda "WhatsApp Hattı" eksik girilmiş, hemen tamamlayarak dönüşümleri artırın.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
