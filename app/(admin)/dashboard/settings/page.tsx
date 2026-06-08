import { getSettings, updateSettings } from './actions';
import { Save, Settings, Palette, Phone } from 'lucide-react';
import styles from '../dashboard.module.css';

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className={styles.card}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem'}}>
        <Settings color="#0ea5e9" size={24} />
        <h2 className={styles.cardHeader} style={{marginBottom: 0}}>Global Ayarlar & Firma Bilgileri</h2>
      </div>
      
      <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem'}}>
        Kurumsal kimlik bilgilerinizi, sistem ayarlarınızı ve iletişim kanallarınızı buradan yönetebilirsiniz. 
        Web tasarımı ve arayüz bu verileri otomatik olarak okuyacaktır.
      </p>

      <form action={updateSettings} style={{display: 'flex', flexDirection: 'column', gap: '3rem'}}>
        
        {/* Kurumsal Bilgiler */}
        <div style={{background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 600, color: '#334155'}}>
            <Palette size={18} /> Kurumsal Bilgiler
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
            <div style={{gridColumn: '1 / -1'}}>
              <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Resmi Firma Adı / Logo Yazısı</label>
              <input type="text" name="site_logo" defaultValue={settings.site_logo || 'FT Dijital Prime'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1'}} />
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div style={{background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 600, color: '#334155'}}>
            <Phone size={18} /> İletişim & Footer Bilgileri
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
            <div>
              <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Telefon Numarası</label>
              <input type="text" name="contact_phone" defaultValue={settings.contact_phone || '+90 555 555 5555'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1'}} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>E-Posta Adresi</label>
              <input type="email" name="contact_email" defaultValue={settings.contact_email || 'info@ftdijital.com'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1'}} />
            </div>
            <div style={{gridColumn: '1 / -1'}}>
              <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Açık Adres</label>
              <textarea name="contact_address" rows={2} defaultValue={settings.contact_address || 'İstanbul, Türkiye'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1'}}></textarea>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Instagram Linki</label>
              <input type="url" name="social_instagram" defaultValue={settings.social_instagram || ''} placeholder="https://instagram.com/..." style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1'}} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>LinkedIn Linki</label>
              <input type="url" name="social_linkedin" defaultValue={settings.social_linkedin || ''} placeholder="https://linkedin.com/in/..." style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1'}} />
            </div>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" style={{background: '#2563eb', color: 'white', padding: '0.75rem 2.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600}}>
            <Save size={18} /> Ayarları Kaydet
          </button>
        </div>

      </form>
    </div>
  );
}
