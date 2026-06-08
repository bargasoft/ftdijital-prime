import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Hoş Geldiniz</h1>
        <button className={styles.gradientButton}>Hızlı İçerik Ekle</button>
      </header>
      
      <div className={styles.card}>
        <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>Sistem Durumu</h2>
        <p style={{ color: '#64748b' }}>
          Tüm sistemler aktif. Web arayüzündeki verileri soldaki menüyü kullanarak yönetebilirsiniz. 
          Değişiklikler anında canlı siteye (web arayüzüne) yansıyacaktır.
        </p>
      </div>
    </div>
  );
}
