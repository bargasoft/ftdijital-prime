import Link from 'next/link';

export default function Footer({ 
  siteLogo, 
  primaryColor,
  phone,
  email,
  address,
  instagram,
  linkedin,
  footerTheme = 'dark',
  footerColumns = '3'
}: { 
  siteLogo?: string, 
  primaryColor?: string,
  phone?: string,
  email?: string,
  address?: string,
  instagram?: string,
  linkedin?: string,
  footerTheme?: string,
  footerColumns?: string
}) {

  const getThemeStyles = () => {
    switch (footerTheme) {
      case 'light': return { bg: '#f8fafc', text: '#475569', border: '#e2e8f0', title: '#0f172a' };
      case 'colored': return { bg: primaryColor || '#0ea5e9', text: 'rgba(255,255,255,0.8)', border: 'rgba(255,255,255,0.2)', title: 'white' };
      case 'dark':
      default: return { bg: '#0f172a', text: '#94a3b8', border: '#1e293b', title: 'white' };
    }
  };

  const theme = getThemeStyles();

  return (
    <footer style={{
      background: theme.bg, 
      color: theme.text,
      padding: '4rem 1rem 2rem 1rem',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: '3rem',
        borderBottom: `1px solid ${theme.border}`,
        paddingBottom: '3rem',
        marginBottom: '2rem'
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontSize: '1.5rem', 
            fontWeight: 800, 
            color: theme.title, 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{width: '32px', height: '32px', borderRadius: '8px', background: footerTheme === 'colored' ? 'white' : (primaryColor || '#0ea5e9'), color: footerTheme === 'colored' ? (primaryColor || '#0ea5e9') : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem'}}>
              {siteLogo ? siteLogo.charAt(0) : 'F'}
            </div>
            {siteLogo || 'FT Dijital Prime'}
          </div>
          <p style={{fontSize: '0.9rem', lineHeight: 1.6}}>
            Geleceğin işletmelerini yeniden inşa ediyoruz. Dijital dönüşüm ve yazılım çözümlerinde güvenilir iş ortağınız.
          </p>
        </div>

        {/* İletişim */}
        <div id="iletisim">
          <h4 style={{color: theme.title, marginBottom: '1rem', fontSize: '1.1rem'}}>İletişim</h4>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem'}}>
            <li>📞 {phone || '+90 555 555 5555'}</li>
            <li>✉️ {email || 'info@ftdijital.com'}</li>
            <li>📍 {address || 'İstanbul, Türkiye'}</li>
          </ul>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h4 style={{color: theme.title, marginBottom: '1rem', fontSize: '1.1rem'}}>Bağlantılar</h4>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem'}}>
            <li><Link href="/" style={{color: 'inherit', textDecoration: 'none'}}>Anasayfa</Link></li>
            <li><Link href="#hizmetler" style={{color: 'inherit', textDecoration: 'none'}}>Hizmetlerimiz</Link></li>
            <li><Link href="#cozumler" style={{color: 'inherit', textDecoration: 'none'}}>Çözümler</Link></li>
            <li><Link href="/blog" style={{color: 'inherit', textDecoration: 'none'}}>Blog</Link></li>
          </ul>
        </div>

        {/* Opsiyonel 4. Sütun (Bülten) */}
        {footerColumns === '4' && (
          <div>
            <h4 style={{color: theme.title, marginBottom: '1rem', fontSize: '1.1rem'}}>E-Bülten</h4>
            <p style={{fontSize: '0.85rem', marginBottom: '1rem'}}>Yeniliklerden haberdar olmak için e-bültenimize kayıt olun.</p>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <input type="email" placeholder="E-Posta" style={{padding: '0.5rem', borderRadius: '4px', border: `1px solid ${theme.border}`, width: '100%', background: footerTheme === 'dark' ? '#1e293b' : 'white', color: theme.title}} />
              <button style={{padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: footerTheme === 'colored' ? 'white' : (primaryColor || '#0ea5e9'), color: footerTheme === 'colored' ? (primaryColor || '#0ea5e9') : 'white', cursor: 'pointer', fontWeight: 600}}>Kaydol</button>
            </div>
          </div>
        )}
      </div>

      <div style={{
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.85rem'
      }}>
        <div>&copy; {new Date().getFullYear()} {siteLogo || 'FT Dijital Prime'}. Tüm hakları saklıdır.</div>
        <div style={{display: 'flex', gap: '1rem'}}>
          {instagram && <a href={instagram} target="_blank" rel="noreferrer" style={{color: theme.title, textDecoration: 'none'}}>Instagram</a>}
          {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" style={{color: theme.title, textDecoration: 'none'}}>LinkedIn</a>}
        </div>
      </div>
    </footer>
  );
}
