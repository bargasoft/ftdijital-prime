import prisma from '@/lib/db';
import styles from '../dashboard.module.css';
import { addSlider, deleteSlider } from './actions';

export default async function SliderPage() {
  const sliders = await prisma.slider.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Slider Yönetimi</h1>
      </header>

      <div className={styles.card}>
        <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>Yeni Slayt Ekle</h2>
        <form action={addSlider} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
          <input name="title" placeholder="Ana Başlık (Örn: Geleceği İnşa Ediyoruz)" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          <input name="subtitle" placeholder="Alt Başlık" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          <input name="btnText" placeholder="Buton Metni (Örn: Hemen İncele)" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          <input name="imageUrl" placeholder="Arkaplan Resim URL (https://...)" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          <button type="submit" className={styles.gradientButton} style={{ width: 'fit-content' }}>Slayt Ekle</button>
        </form>
      </div>

      <div className={styles.card}>
        <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>Mevcut Slaytlar</h2>
        {sliders.length === 0 ? <p>Henüz slayt eklenmemiş.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1rem 0' }}>Başlık</th>
                <th style={{ padding: '1rem 0' }}>Alt Başlık</th>
                <th style={{ padding: '1rem 0' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((s: any) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 0', fontWeight: '500' }}>{s.title}</td>
                  <td style={{ padding: '1rem 0', color: '#64748b' }}>{s.subtitle}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <form action={deleteSlider.bind(null, s.id)}>
                      <button type="submit" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Sil</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
