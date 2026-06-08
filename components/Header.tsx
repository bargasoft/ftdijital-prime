import Link from 'next/link';

export default function Header({ 
  siteLogo, 
  primaryColor 
}: { 
  siteLogo: string, 
  primaryColor: string 
}) {
  return (
    <header style={{
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      background: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(10px)', 
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div style={{
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '1rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontSize: '1.5rem', 
          fontWeight: 800, 
          color: primaryColor || '#0ea5e9', 
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {/* İsteğe bağlı ikon */}
          <div style={{width: '32px', height: '32px', borderRadius: '8px', background: primaryColor || '#0ea5e9', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem'}}>
            {siteLogo ? siteLogo.charAt(0) : 'F'}
          </div>
          {siteLogo || 'FT Dijital Prime'}
        </Link>

        {/* Ortadaki Linkler */}
        <nav style={{display: 'flex', gap: '2rem'}}>
          <Link href="/" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Anasayfa</Link>
          <Link href="#hizmetler" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Hizmetler</Link>
          <Link href="#cozumler" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Çözümler</Link>
          <Link href="/blog" style={{textDecoration: 'none', color: '#334155', fontWeight: 500, fontSize: '0.9rem'}}>Blog</Link>
        </nav>

        {/* Sağ Düğme */}
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
      </div>
    </header>
  );
}
