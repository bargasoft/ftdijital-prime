import { getSettings } from '../../settings/actions';
import { ArrowUpDown } from 'lucide-react';
import styles from '../../../dashboard.module.css';
import LayoutDnd from '@/components/LayoutDnd';

export default async function LayoutDesignPage() {
  const settings = await getSettings();
  
  let initialLayout = ['slider', 'services', 'solutions'];
  if (settings.home_layout) {
    try {
      initialLayout = JSON.parse(settings.home_layout);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.card}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem'}}>
        <ArrowUpDown color="#0ea5e9" size={24} />
        <h2 className={styles.cardHeader} style={{marginBottom: 0}}>Sayfa Düzeni (Sürükle & Bırak)</h2>
      </div>
      
      <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem'}}>
        Aşağıdaki modülleri fareyle tutup sürükleyerek anasayfanızdaki görünüm sırasını değiştirebilirsiniz. 
        En üstte olan modül, web sitesinde de en üstte çıkacaktır.
      </p>

      <div style={{background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
        <LayoutDnd initialLayout={initialLayout} />
      </div>
    </div>
  );
}
