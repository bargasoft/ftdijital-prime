import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

export default function Footer() {
  return (
    <footer style={{
      background: '#f8fafc',
      borderTop: '1px solid #e2e8f0',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '4rem',
        marginBottom: '4rem'
      }}>
        
        {/* Logo and About */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png" alt="FT Dijital" style={{ height: '40px', objectFit: 'contain' }} />
            <div style={{ width: '1px', height: '32px', background: '#cbd5e1' }}></div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
              DİJİTAL OPERASYON<br />MERKEZİNİZ
            </div>
          </div>
          
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
            İşletmelerin dijital altyapısını bütünsel bir yaklaşımla yönetiyor, sürdürülebilir büyümelerine katkı sağlıyoruz.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'white', color: '#0f172a', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}><LinkedinIcon /></a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'white', color: '#0f172a', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}><InstagramIcon /></a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'white', color: '#0f172a', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}><TwitterIcon /></a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'white', color: '#0f172a', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}><YoutubeIcon /></a>
          </div>
        </div>

        {/* Çözümlerimiz */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ft-blue)', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>ÇÖZÜMLERİMİZ</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#475569' }}>
            <li><Link href="#">Logo ERP Çözümleri</Link></li>
            <li><Link href="#">Muhasebe Sistemleri</Link></li>
            <li><Link href="#">Dijital Dönüşüm Danışmanlığı</Link></li>
            <li><Link href="#">Entegrasyon Çözümleri</Link></li>
            <li><Link href="#">Yapay Zeka Çözümleri</Link></li>
            <li><Link href="#">Altyapı & Güvenlik</Link></li>
            <li><Link href="#">Yazılım Geliştirme</Link></li>
            <li><Link href="#">Web & E-Ticaret Çözümleri</Link></li>
          </ul>
        </div>

        {/* Kurumsal */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ft-blue)', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>KURUMSAL</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#475569' }}>
            <li><Link href="#">Hakkımızda</Link></li>
            <li><Link href="#">Vizyon & Misyon</Link></li>
            <li><Link href="#">Değerlerimiz</Link></li>
            <li><Link href="#">Kariyer</Link></li>
            <li><Link href="#">Haberler</Link></li>
          </ul>
        </div>

        {/* Destek */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ft-blue)', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>DESTEK</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#475569' }}>
            <li><Link href="#">Teknik Destek</Link></li>
            <li><Link href="#">Uzaktan Destek</Link></li>
            <li><Link href="#">Sık Sorulan Sorular</Link></li>
            <li><Link href="#">KVKK</Link></li>
            <li><Link href="#">Gizlilik Politikası</Link></li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ft-blue)', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>İLETİŞİM</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#475569' }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              Teknopark İstanbul<br />
              Sanayi Mah. Teknopark Bulvarı<br />
              No:1/12 34906 Pendik / İstanbul
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Phone size={16} color="var(--ft-blue)" /> +90 555 123 45 67
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Mail size={16} color="var(--ft-blue)" /> info@ftdijital.com
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid #e2e8f0', padding: '2rem 0 0 0', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
        © 2024 FT Dijital. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
