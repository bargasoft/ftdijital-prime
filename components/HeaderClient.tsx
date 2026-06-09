'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeaderClient({ 
  menuItems, 
  siteLogoLight, 
  siteLogoDark, 
  siteLogoText, 
  primaryColor 
}: any) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid #f1f5f9' : '1px solid transparent',
      zIndex: 100,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Bar - İletişim ve Destek */}
      <div style={{
        height: isScrolled ? '0px' : '36px',
        overflow: 'hidden',
        transition: 'height 0.3s ease',
        background: '#f8fafc',
        borderBottom: isScrolled ? 'none' : '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        opacity: isScrolled ? 0 : 1
      }}>
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', fontSize: '0.75rem', fontWeight: 500 }}>
          <a href="mailto:info@ftdijital.com" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', textDecoration: 'none' }}>
            <Mail size={14} /> info@ftdijital.com
          </a>
          <a href="tel:+905551234567" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', textDecoration: 'none' }}>
            <Phone size={14} /> +90 555 123 45 67
          </a>
          <div style={{ width: '1px', height: '14px', background: '#cbd5e1' }}></div>
          <Link href="#destek" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ft-blue)', fontWeight: 600, textDecoration: 'none' }}>
            Destek Merkezi
          </Link>
        </div>
      </div>

      {/* Main Header Area */}
      <div style={{ 
        maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 2rem', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: isScrolled ? '0.75rem' : '1.25rem',
        paddingBottom: isScrolled ? '0.75rem' : '1.25rem',
        transition: 'all 0.3s ease'
      }}>
        
        {/* Logo and Slogan Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Kullanıcının kendi logosu eklendi */}
            <img src="/logo.png" alt="FT Dijital" style={{ height: '40px', objectFit: 'contain' }} />
          </Link>
          <div className="header-slogan-divider" style={{ width: '1px', height: '32px', background: '#cbd5e1' }}></div>
          <div className="header-slogan" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            DİJİTAL OPERASYON<br />MERKEZİNİZ
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'none', md: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Hizmetlerimiz', href: '#hizmetlerimiz' },
            { label: 'Çözümlerimiz', href: '#cozumlerimiz' },
            { label: 'Hakkımızda', href: '#hakkimizda' },
          ].map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.label} 
                href={item.href}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--ft-text-main)' : 'var(--ft-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: '0.2rem',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ft-text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive ? 'var(--ft-text-main)' : 'var(--ft-text-muted)'}
              >
                {item.label}
                {isActive && (
                  <div style={{ position: 'absolute', bottom: -8, left: 0, right: 0, height: '2px', background: 'var(--ft-blue)', borderRadius: '2px' }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="#iletisim" style={{
            background: 'var(--ft-blue)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
            whiteSpace: 'nowrap',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1d4ed8';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.23)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--ft-blue)';
            e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(37, 99, 235, 0.39)';
          }}>
            Bize Ulaşın <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 1025px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 1200px) {
          .header-slogan-divider, .header-slogan { display: none !important; }
        }
      `}} />
    </header>
  );
}
