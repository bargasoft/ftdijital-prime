'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { LayoutDashboard, Images, Briefcase, Settings, Newspaper, Layers, Bell, Search, Hexagon, Store, HeadphonesIcon, Globe, ChevronRight } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Özet', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Slider', href: '/dashboard/slider', icon: Images },
    { name: 'Hizmetler', href: '/dashboard/services', icon: Briefcase },
    { name: 'Çözümler', href: '/dashboard/solutions', icon: Layers },
    { name: 'Blog', href: '/dashboard/blog', icon: Newspaper },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className={styles.layout}>
      
      {/* SaaS Narrow Sidebar (Full Height) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <Hexagon fill="#3b82f6" strokeWidth={0} size={32} />
        </div>
        
        <div className={styles.sidebarToggle}>
          <ChevronRight size={14} />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className={isActive ? styles.navItemActive : styles.navItem}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={styles.tooltip}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Initials at bottom */}
        <div className={styles.userProfileBottom}>
          FT
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        
        {/* Dark Topbar (Right of Sidebar) */}
        <header className={styles.topbar}>
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
            <button className={styles.topButton} style={{border: 'none', padding: '0.4rem', background: '#334155'}}>
              TR
            </button>
            <button className={styles.topButton} style={{border: 'none', padding: '0.4rem'}}>
              <Bell size={18} />
            </button>
          </div>
        </header>

        <main className={styles.main}>
          {children}
        </main>
      </div>

    </div>
  );
}
