'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { 
  LayoutDashboard, Box, Receipt, Sparkles, Users, Paintbrush, 
  Search, ChevronRight, ChevronLeft, User, LogOut, Bot, Store, 
  Globe, HeadphonesIcon, Bell, LayoutGrid, LayoutTemplate, Briefcase, FileText
} from 'lucide-react';
import UserSwitcher from './UserSwitcher';

export default function LayoutClient({
  children,
  permissions
}: {
  children: React.ReactNode;
  permissions: string[];
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

  const hasPerm = (p: string) => permissions.includes('ALL') || permissions.includes(p);

  const rawNavItems = [
    { name: 'Özet', href: '/dashboard', icon: LayoutDashboard }, 
    { name: 'Hizmetler', href: '/dashboard/services', icon: Receipt, permission: 'MANAGE_SERVICES' }, 
    { 
      name: 'Çözümler', 
      icon: Sparkles,
      permission: 'MANAGE_SOLUTIONS',
      children: [
        { name: 'Çözüm Yönetimi', href: '/dashboard/solutions' },
        { name: 'Kategoriler', href: '/dashboard/categories' },
      ]
    }, 
    { name: 'Blog', href: '/dashboard/blog', icon: Users }, 
    { 
      name: 'CRM', 
      icon: Briefcase,
      children: [
        { name: 'Müşteriler', href: '/dashboard/crm/customers' },
        { name: 'Fırsatlar', href: '/dashboard/crm/deals' },
        { name: 'Destek Talepleri', href: '/dashboard/crm/support', permission: 'VIEW_TICKETS' },
      ]
    },
    { 
      name: 'İçerik Yönetimi', 
      icon: FileText,
      children: [
        { name: 'Sayfalar', href: '/dashboard/pages' },
        { name: 'Slider', href: '/dashboard/slider' },
      ]
    },
    { 
      name: 'Web Tasarım', 
      icon: LayoutTemplate,
      permission: 'MANAGE_WEBDESIGN',
      children: [
        { name: 'Menüler', href: '/dashboard/menus' },
        { name: 'Sayfa Düzeni', href: '/dashboard/web-design/layout' },
        { name: 'Header Tasarımı', href: '/dashboard/web-design/header' },
        { name: 'Footer Tasarımı', href: '/dashboard/web-design/footer' },
      ]
    },
    { 
      name: 'Ayarlar', 
      icon: Paintbrush,
      permission: 'MANAGE_USERS', // Settings usually requires admin
      children: [
        { name: 'Firma Ayarları', href: '/dashboard/settings/company' },
        { name: 'Kullanıcı Yönetimi', href: '/dashboard/settings/users', permission: 'MANAGE_USERS' },
        { name: 'Rol ve Yetki Yönetimi', href: '/dashboard/settings/roles', permission: 'MANAGE_ROLES' },
      ]
    }, 
  ];

  // Filtreleme
  const navItems = rawNavItems.filter(item => {
    if (item.permission && !hasPerm(item.permission)) return false;
    
    // Alt menülerin kontrolü
    if (item.children) {
      item.children = item.children.filter(child => {
        if ((child as any).permission && !hasPerm((child as any).permission)) return false;
        return true;
      });
      // Eğer filtrelendikten sonra hiç alt menü kalmadıysa, bu ana menüyü de gizleyebiliriz
      // Ancak şimdilik sadece var olanları göstereceğiz
    }
    return true;
  });

  return (
    <div className={styles.layout}>
      
      {/* Dark Topbar */}
      <header className={styles.topbar}>
        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Menü ve Modüllerde Ara" className={styles.searchInput} />
        </div>

        <div className={styles.topActions}>
          <UserSwitcher />
          
          <a href="/" target="_blank" className={styles.topButton} style={{color: '#10b981', borderColor: '#065f46', background: '#064e3b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Globe size={14} /> Sitede Gör
          </a>
          <a href="/dashboard/crm/support" className={styles.topButton} style={{textDecoration: 'none'}}>
            <HeadphonesIcon size={14} /> Destek Merkezi
          </a>
          <button className={styles.topButton} style={{border: 'none', background: 'transparent'}}>
            <Bell size={18} />
          </button>
          <button className={styles.topButton} style={{border: 'none', background: 'transparent'}}>
            TR <ChevronRight size={12} style={{transform: 'rotate(90deg)'}} />
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
             <img src="https://www.ftdijital.com/Content/assets/images/logo/ft_dijital_logo.png" alt="FT Dijital" style={{height: '35px', objectFit: 'contain'}} />
          ) : (
             <img src="https://www.ftdijital.com/Content/assets/images/logo/ft_dijital_logo.png" alt="FT Dijital" style={{height: '24px', objectFit: 'cover', width: '24px', objectPosition: 'left'}} />
          )}
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const hasChildren = !!item.children && item.children.length > 0;
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
                v1.0.0<br/>BarGa Soft
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
