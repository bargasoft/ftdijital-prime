'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { 
  LayoutDashboard, Box, Receipt, Sparkles, Users, Paintbrush, 
  Search, ChevronRight, ChevronLeft, User, LogOut, Bot, Store, 
  Globe, HeadphonesIcon, Bell, LayoutGrid
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  // Exact icons from the cropped screenshot
  const navItems = [
    { name: 'Özet', href: '/dashboard', icon: LayoutDashboard }, 
    { name: 'Slider', href: '/dashboard/slider', icon: Box }, 
    { name: 'Hizmetler', href: '/dashboard/services', icon: Receipt }, 
    { name: 'Çözümler', href: '/dashboard/solutions', icon: Sparkles }, 
    { name: 'Blog', href: '/dashboard/blog', icon: Users }, 
    { name: 'Ayarlar', href: '/dashboard/settings', icon: Paintbrush }, 
  ];

  return (
    <div className={styles.layout}>
      
      {/* Dark Topbar (Spans full width behind sidebar) */}
      <header className={styles.topbar}>
        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Menü ve Modüllerde Ara" className={styles.searchInput} />
        </div>

        <div className={styles.topActions}>
          <div className={styles.robotIcon}>
            <Bot size={20} />
          </div>
          <button className={styles.topButton}>
            <Store size={14} /> Uygulama Marketi
          </button>
          <button className={styles.topButton} style={{color: '#10b981', borderColor: '#065f46', background: '#064e3b'}}>
            <Globe size={14} /> Sitede Gör
          </button>
          <button className={styles.topButton}>
            <HeadphonesIcon size={14} /> Destek Merkezi
          </button>
          <button className={styles.topButton} style={{border: 'none', background: 'transparent'}}>
            <Bell size={18} />
          </button>
          <button className={styles.topButton} style={{border: 'none', background: 'transparent'}}>
            TR <ChevronRight size={12} style={{transform: 'rotate(90deg)'}} />
          </button>
          <button className={styles.topButton} style={{background: '#334155', borderColor: '#475569', color: 'white'}}>
            <LayoutGrid size={14} /> Uygulamalar
          </button>
        </div>
      </header>

      {/* Floating Pill Sidebar */}
      <aside className={`${styles.sidebar} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`}>
        
        <div className={styles.sidebarToggle} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </div>

        <div className={styles.sidebarLogo}>
          {isExpanded ? (
             <div style={{fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1px'}}>ticimax</div>
          ) : (
             <div>X<span style={{fontSize: '1rem', fontWeight: 500}}>®</span></div>
          )}
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className={isActive ? styles.navItemActive : styles.navItem}>
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                {isExpanded && <span className={styles.navText}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Area matches crop exactly */}
        <div className={styles.userProfileBottom}>
          <div className={styles.userAvatar}>HS</div>
          {!isExpanded && (
            <>
              <User size={18} className={styles.bottomIcon} strokeWidth={1.5} />
              <LogOut size={18} className={styles.bottomIcon} strokeWidth={1.5} />
              <div className={styles.versionText}>
                0.18.00.1<br/>8.13.716.0
              </div>
            </>
          )}
          {isExpanded && (
            <div style={{fontSize: '0.8rem', textAlign: 'center'}}>
               Hüseyin Silahlı<br/><span style={{color: '#64748b', fontSize: '0.7rem'}}>Çıkış</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>

    </div>
  );
}
