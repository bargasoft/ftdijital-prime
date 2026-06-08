'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { LayoutDashboard, Images, Briefcase, Settings, Newspaper, Layers, Bell, Search, Hexagon, Store, HeadphonesIcon, Globe } from 'lucide-react';

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
      {/* SaaS Top Header */}
      <header className={styles.topbar}>
        <div className={styles.logo}>
          <Hexagon fill="#3b82f6" strokeWidth={0} size={24} />
          FT Prime
        </div>
        
        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Menü ve Modüllerde Ara" className={styles.searchInput} />
        </div>

        <div className={styles.topActions}>
          <button className={styles.topButton}>
            <Store size={16} /> Uygulama Marketi
          </button>
          <button className={styles.topButton}>
            <Globe size={16} /> Sitede Gör
          </button>
          <button className={styles.topButton}>
            <HeadphonesIcon size={16} /> Destek Merkezi
          </button>
          <button className={styles.topButton} style={{border: 'none', padding: '0.4rem'}}>
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Container with Narrow Sidebar */}
      <div className={styles.mainWrapper}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href} className={isActive ? styles.navItemActive : styles.navItem}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={styles.tooltip}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
