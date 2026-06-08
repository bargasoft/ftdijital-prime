import { getSettings, updateSettings } from '../../settings/actions';
import { LayoutTemplate, Save } from 'lucide-react';
import styles from '../../../dashboard.module.css';

export default async function HeaderDesignPage() {
  const settings = await getSettings();

  return (
    <div className={styles.card}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem'}}>
        <LayoutTemplate color="#0ea5e9" size={24} />
        <h2 className={styles.cardHeader} style={{marginBottom: 0}}>Header Tasarımı</h2>
      </div>
      
      <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem'}}>
        Sitenizin üst bilgi (Header) alanının görünümünü buradan yönetebilirsiniz. 
        Logo resmi ve iletişim bilgileri "Global Ayarlar" menüsünden çekilmektedir.
      </p>

      <form action={updateSettings} style={{display: 'flex', flexDirection: 'column', gap: '3rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <div>
            <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Logo Konumu</label>
            <select name="header_logo_align" defaultValue={settings.header_logo_align || 'left'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white'}}>
              <option value="left">Solda</option>
              <option value="center">Ortada</option>
              <option value="right">Sağda</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Menü Tipi</label>
            <select name="header_menu_style" defaultValue={settings.header_menu_style || 'standard'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white'}}>
              <option value="standard">Standart</option>
              <option value="mega">Mega Menü</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Arkaplan Stili</label>
            <select name="header_bg_style" defaultValue={settings.header_bg_style || 'glass'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white'}}>
              <option value="glass">Cam Efekti (Glassmorphism)</option>
              <option value="solid">Düz Renk (Solid)</option>
              <option value="transparent">Şeffaf (Transparent)</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Ana Tema Rengi (Butonlar İçin)</label>
            <input type="color" name="primary_color" defaultValue={settings.primary_color || '#0ea5e9'} style={{width: '100%', height: '42px', padding: '0.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer'}} />
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" style={{background: '#2563eb', color: 'white', padding: '0.75rem 2.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600}}>
            <Save size={18} /> Tasarımı Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
