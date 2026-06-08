import prisma from '@/lib/db';
import styles from '../dashboard.module.css';
import { addPage, deletePage } from './actions';
import { FileText, Save, Trash2 } from 'lucide-react';

export default async function PagesManager() {
  const pages = await prisma.page.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <FileText size={28} /> Sayfa Yönetimi (Pages)
        </h1>
        <p className={styles.subtitle}>Sitenize dilediğiniz kadar yeni dinamik sayfa ekleyebilirsiniz.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem'}}>
        {/* Sol Kolon - Form */}
        <div className={styles.card} style={{ flex: 1, height: 'fit-content' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             Yeni Sayfa Oluştur
          </h2>
          <form action={addPage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label>Sayfa Başlığı</label>
              <input name="title" required placeholder="Örn: Hakkımızda" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
            </div>
            
            <div className={styles.formGroup}>
              <label>Kısa URL (Slug)</label>
              <input name="slug" required placeholder="Örn: hakkimizda" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%' }} />
              <small style={{color: '#64748b', display: 'block', marginTop: '0.25rem'}}>Bu adres şu şekilde görünecektir: www.site.com/<b>slug</b></small>
            </div>

            <div className={styles.formGroup}>
              <label>İçerik (Metin / HTML)</label>
              <textarea name="content" required placeholder="Sayfa içeriğinizi buraya yazabilirsiniz..." rows={12} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical', width: '100%', fontFamily: 'inherit' }}></textarea>
            </div>

            <button type="submit" className={styles.gradientButton} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Save size={18} /> Sayfayı Yayınla
            </button>
          </form>
        </div>

        {/* Sağ Kolon - Liste */}
        <div className={styles.card} style={{ flex: 1, height: 'fit-content' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#0f172a' }}>Mevcut Sayfalar</h2>
          
          {pages.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
              Henüz sayfa oluşturmadınız.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pages.map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a' }}>{p.title}</h4>
                    <a href={`/${p.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#0ea5e9', textDecoration: 'none' }}>
                      / {p.slug}
                    </a>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <form action={deletePage.bind(null, p.id)}>
                      <button type="submit" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
