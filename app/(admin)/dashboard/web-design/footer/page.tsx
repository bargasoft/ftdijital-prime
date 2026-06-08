import { getSettings, updateSettings } from '../../settings/actions';
import { PanelBottom, Save } from 'lucide-react';
import styles from '../../dashboard.module.css';

export default async function FooterDesignPage() {
  const settings = await getSettings();

  return (
    <div className={styles.card}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem'}}>
        <PanelBottom color="#0ea5e9" size={24} />
        <h2 className={styles.cardHeader} style={{marginBottom: 0}}>Footer Tasarımı</h2>
      </div>
      
      <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem'}}>
        Sitenizin alt bilgi (Footer) alanının düzenini ve temasını buradan yönetin. 
        Adres, telefon, e-posta gibi veriler "Global Ayarlar" menüsünden otomatik çekilir.
      </p>

      <form action={updateSettings} style={{display: 'flex', flexDirection: 'column', gap: '3rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <div>
            <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Footer Tema Rengi</label>
            <select name="footer_theme" defaultValue={settings.footer_theme || 'dark'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white'}}>
              <option value="dark">Koyu Tema (Dark)</option>
              <option value="light">Açık Tema (Light)</option>
              <option value="colored">Ana Renk Teması (Colored)</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Sütun Yapısı</label>
            <select name="footer_columns" defaultValue={settings.footer_columns || '3'} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white'}}>
              <option value="3">3 Sütunlu (Firma, İletişim, Linkler)</option>
              <option value="4">4 Sütunlu (Bülten Aboneliği Ekler)</option>
            </select>
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
