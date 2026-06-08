import Link from 'next/link';

export default function Header({ 
  siteLogo, 
  primaryColor,
  headerLogoAlign = 'left',
  headerMenuStyle = 'standard',
  headerBgStyle = 'glass'
}: { 
  siteLogo: string, 
  primaryColor: string,
  headerLogoAlign?: string,
  headerMenuStyle?: string,
  headerBgStyle?: string
}) {

  const getBgStyle = () => {
    switch (headerBgStyle) {
      case 'solid': return { background: 'white', borderBottom: '1px solid #e2e8f0' };
      case 'transparent': return { background: 'transparent', borderBottom: 'none' };
      case 'glass':
      default: return { background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e2e8f0' };
    }
  };

  return (
    <header style={{
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      ...getBgStyle()
    }}>
      <div style={{
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '1rem', 
        display: 'flex', 
        justifyContent: headerLogoAlign === 'center' ? 'center' : 'space-between',
        flexDirection: headerLogoAlign === 'right' ? 'row-reverse' : 'row',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontSize: '1.5rem', 
          fontWeight: 800, 
          color: primaryColor || '#0ea5e9', 
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          position: headerLogoAlign === 'center' ? 'absolute' : 'relative',
          left: headerLogoAlign === 'center' ? '50%' : 'auto',
          transform: headerLogoAlign === 'center' ? 'translateX(-50%)' : 'none'
        }}>
          <div style={{width: '32px', height: '32px', borderRadius: '8px', background: primaryColor || '#0ea5e9', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem'}}>
            {siteLogo ? siteLogo.charAt(0) : 'F'}
          </div>
          {siteLogo || 'FT Dijital Prime'}
        </Link>

        {/* Ortadaki Linkler */}
        <nav style={{
          display: 'flex', 
          gap: headerMenuStyle === 'mega' ? '3rem' : '2rem', 
          alignItems: 'center',
          visibility: headerLogoAlign === 'center' ? 'hidden' : 'visible' // Ortala ise şimdilik menü gizli kalabilir (basit versiyon) veya sola alınabilir
        }}>
          {headerLogoAlign !== 'center' && (
            <>
              <Link href="/" style={{textDecoration: 'none', color: '#334155', fontWeight: headerMenuStyle === 'mega' ? 700 : 500, fontSize: '0.9rem'}}>Anasayfa</Link>
              <Link href="#hizmetler" style={{textDecoration: 'none', color: '#334155', fontWeight: headerMenuStyle === 'mega' ? 700 : 500, fontSize: '0.9rem'}}>Hizmetler {headerMenuStyle === 'mega' && '▼'}</Link>
              <Link href="#cozumler" style={{textDecoration: 'none', color: '#334155', fontWeight: headerMenuStyle === 'mega' ? 700 : 500, fontSize: '0.9rem'}}>Çözümler</Link>
              <Link href="/blog" style={{textDecoration: 'none', color: '#334155', fontWeight: headerMenuStyle === 'mega' ? 700 : 500, fontSize: '0.9rem'}}>Blog</Link>
              
              <div>
                <Link href="#iletisim" style={{
                  background: primaryColor || '#0ea5e9', 
                  color: 'white', 
                  padding: '0.6rem 1.5rem', 
                  borderRadius: '9999px', 
                  textDecoration: 'none', 
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: `0 4px 14px 0 ${primaryColor}40`
                }}>
                  Bize Ulaşın
                </Link>
              </div>
            </>
          )}
        </nav>
        
        {/* Ortada ise menüyü sağa al */}
        {headerLogoAlign === 'center' && (
           <div style={{display: 'flex', gap: '2rem', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
             <nav style={{display: 'flex', gap: '2rem'}}>
                <Link href="/" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Anasayfa</Link>
                <Link href="#hizmetler" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Hizmetler</Link>
             </nav>
             <nav style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
                <Link href="#cozumler" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Çözümler</Link>
                <Link href="/blog" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Blog</Link>
             </nav>
           </div>
        )}
      </div>
    </header>
  );
}
