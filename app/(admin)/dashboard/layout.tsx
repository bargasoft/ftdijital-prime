'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { 
  LayoutDashboard, Images, Briefcase, Layers, Newspaper, Settings, 
  Bot, Store, Globe, HeadphonesIcon, Bell, ChevronRight, ChevronLeft, 
  LayoutGrid, Sparkles, Search as SearchIcon
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true); // Default to expanded to match the screenshot request

  const navItems = [
    { name: 'Anasayfa', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Slider Yönetimi', href: '/dashboard/slider', icon: Images },
    { name: 'Hizmetler', href: '/dashboard/services', icon: Briefcase },
    { name: 'Çözümler', href: '/dashboard/solutions', icon: Layers },
    { name: 'Blog & İçerikler', href: '/dashboard/blog', icon: Newspaper },
    { name: 'Genel Ayarlar', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className={styles.layout}>
      
      {/* SaaS Sidebar (Expandable) */}
      <aside className={`${styles.sidebar} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`}>
        
        {/* Toggle Button Overlapping Right Border */}
        <div className={styles.sidebarToggle} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </div>

        {/* Logo */}
        <div className={styles.sidebarLogo}>
          {isExpanded ? (
             <div className={styles.logoText}>
               <span style={{fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1px'}}>-ticimax</span>
               <span className={styles.logoBeta}>BETA</span>
             </div>
          ) : (
             <div style={{fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-1px'}}>-t</div>
          )}
        </div>

        {/* Nav Items */}
        <nav className={styles.nav}>
          {isExpanded && (
            <div style={{padding: '0 1.25rem', marginBottom: '0.75rem'}}>
              <div style={{fontSize: '0.65rem', color: '#2563eb', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px'}}>
                <Sparkles size={12} /> FAVORİ MENÜLER <ChevronRight size={12} style={{marginLeft: 'auto'}}/>
              </div>
              <div style={{fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px'}}>
                 Favori listenizi oluşturmak için pinleyiniz
              </div>
            </div>
          )}

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className={isActive ? styles.navItemActive : styles.navItem}>
                <div className={styles.navIcon}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={styles.navText}>{item.name}</span>
                <ChevronRight size={14} className={styles.navChevron} />
                {!isExpanded && <span className={styles.tooltip}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={styles.userProfileBottom}>
          <div className={styles.userAvatar}>HS</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Hüseyin Silahlı</span>
            <span className={styles.userSub}>Hesabı Göster</span>
            <span className={styles.userSub} style={{marginTop: '2px'}}>Çıkış</span>
          </div>
        </div>

        <div className={styles.versionInfo}>
          Panel: 0.18.0.01<br/>Website: 8.13.71.60
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        
        {/* Dark Topbar */}
        <header className={styles.topbar}>
          <div className={styles.searchBar}>
            <SearchIcon size={16} className={styles.searchIcon} />
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
            <button className={styles.topButton} style={{border: 'none', background: '#1e293b'}}>
              <Bell size={16} />
            </button>
            <button className={styles.topButton} style={{border: 'none', background: '#1e293b'}}>
              TR <ChevronRight size={12} style={{transform: 'rotate(90deg)'}} />
            </button>
            <button className={styles.topButton} style={{background: '#1e3a8a', borderColor: '#1e40af', color: 'white'}}>
              <LayoutGrid size={14} /> Uygulamalar
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
