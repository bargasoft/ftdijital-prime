'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { LayoutDashboard, Images, Briefcase, Settings, Newspaper, Layers, Bell, Search, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Özet (Dashboard)', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Slider Yönetimi', href: '/dashboard/slider', icon: Images },
    { name: 'Hizmetler', href: '/dashboard/services', icon: Briefcase },
    { name: 'Çözümler', href: '/dashboard/solutions', icon: Layers },
    { name: 'Blog & Haberler', href: '/dashboard/blog', icon: Newspaper },
    { name: 'Site Ayarları', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className={styles.layout}>
      {/* Premium Glassmorphic Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Hexagon fill="url(#gradient)" strokeWidth={0} size={28} />
          FT Prime
          <svg width="0" height="0">
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#0ea5e9" offset="0%" />
              <stop stopColor="#8b5cf6" offset="100%" />
            </linearGradient>
          </svg>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className={isActive ? styles.navItemActive : styles.navItem}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <div className={styles.userInfo}>
            <h4>Admin Kullanıcısı</h4>
            <p>Sistem Yöneticisi</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.searchBar}>
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Hızlı arama yapın..." className={styles.searchInput} />
          </div>
          <div className={styles.topActions}>
            <button className={styles.iconButton}>
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content with Framer Motion */}
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
