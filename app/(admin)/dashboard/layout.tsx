import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>FT Prime CMS</div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>Özet (Dashboard)</Link>
          <Link href="/dashboard/slider" className={styles.navItem}>Slider Yönetimi</Link>
          <Link href="/dashboard/services" className={styles.navItem}>Hizmetler</Link>
          <Link href="/dashboard/solutions" className={styles.navItem}>Çözümler</Link>
          <Link href="/dashboard/blog" className={styles.navItem}>Blog & Haberler</Link>
          <Link href="/dashboard/settings" className={styles.navItem}>Site Ayarları</Link>
        </nav>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
