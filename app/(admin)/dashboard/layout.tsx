'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { 
  LayoutDashboard, Box, Receipt, Sparkles, Users, Paintbrush, 
  Search, ChevronRight, ChevronLeft, User, LogOut, Bot, Store, 
  Globe, HeadphonesIcon, Bell, LayoutGrid, LayoutTemplate, Briefcase
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Pinning and hovering state
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // It is expanded if pinned or hovered
  const isExpanded = isPinned || isHovered;

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const navItems = [
    { name: 'Özet', href: '/dashboard', icon: LayoutDashboard }, 
    { name: 'Hizmetler', href: '/dashboard/services', icon: Receipt }, 
    { name: 'Çözümler', href: '/dashboard/solutions', icon: Sparkles }, 
    { name: 'Blog', href: '/dashboard/blog', icon: Users }, 
    { 
      name: 'CRM', 
      icon: Briefcase,
      children: [
        { name: 'Müşteriler', href: '/dashboard/crm/customers' },
        { name: 'Fırsatlar', href: '/dashboard/crm/deals' },
        { name: 'Destek Talepleri', href: '/dashboard/crm/support' },
      ]
    },
    { 
      name: 'Web Tasarım', 
      icon: LayoutTemplate,
      children: [
        { name: 'Sayfa Düzeni', href: '/dashboard/web-design/layout' },
        { name: 'Header Tasarımı', href: '/dashboard/web-design/header' },
        { name: 'Footer Tasarımı', href: '/dashboard/web-design/footer' },
        { name: 'Slider', href: '/dashboard/slider' },
      ]
    },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: Paintbrush }, 
  ];

  return (
    <div className={styles.layout}>
      
      {/* Dark Topbar */}
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
      <aside 
        className={`${styles.sidebar} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <div className={styles.sidebarToggle} onClick={() => setIsPinned(!isPinned)}>
          {isPinned ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </div>

        <div className={styles.sidebarLogo}>
          {isExpanded ? (
             <div style={{fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1px'}}>FT Dijital</div>
          ) : (
             <div style={{fontWeight: 900, fontSize: '1.2rem'}}>FT</div>
          )}
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const hasChildren = !!item.children;
            const isActive = item.href ? pathname === item.href : item.children?.some(c => pathname === c.href);
            const isOpen = openMenus[item.name] || isActive;
            const Icon = item.icon;

            if (hasChildren) {
              return (
                <div key={item.name} className={styles.navGroup}>
                  <div 
                    className={isActive ? styles.navItemActive : styles.navItem} 
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                      if (!isExpanded) setIsPinned(true);
                      toggleMenu(item.name);
                    }}
                  >
                    <div className={styles.navIcon}>
                      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                    </div>
                    {isExpanded && (
                      <>
                        <span className={styles.navText}>{item.name}</span>
                        <div style={{marginLeft: 'auto', marginRight: '1rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)'}}>
                          <ChevronRight size={14} />
                        </div>
                      </>
                    )}
                  </div>
                  
                  {isExpanded && isOpen && (
                    <div className={styles.subNav}>
                      {item.children!.map(child => (
                        <Link key={child.name} href={child.href} className={pathname === child.href ? styles.subNavItemActive : styles.subNavItem}>
                          <div className={styles.subNavBullet} />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.name} href={item.href!} className={isActive ? styles.navItemActive : styles.navItem}>
                <div className={styles.navIcon}>
                  <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                </div>
                {isExpanded && <span className={styles.navText}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Area */}
        <div className={styles.userProfileBottom}>
          <div className={styles.userAvatar}>FT</div>
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
            <div style={{fontSize: '0.85rem', textAlign: 'left', width: '100%', paddingLeft: '1rem'}}>
               FT Dijital Admin<br/><span style={{color: '#64748b', fontSize: '0.75rem', cursor: 'pointer'}}>Çıkış Yap</span>
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
