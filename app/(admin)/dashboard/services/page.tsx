import { getServices, addService, deleteService } from './actions';
import { Plus, Trash2 } from 'lucide-react';
import styles from '../dashboard.module.css';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <div className={styles.cardHeader} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{fontSize:'1.5rem', margin:0}}>Hizmetler Yönetimi</h2>
      </div>

      <div className={styles.chartsGrid} style={{gridTemplateColumns:'1fr 2fr'}}>
        {/* Ekleme Formu */}
        <div className={styles.card}>
          <h3 className={styles.cardHeader} style={{fontSize:'1.1rem'}}>Yeni Hizmet Ekle</h3>
          <form action={addService} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <input name="title" placeholder="Hizmet Başlığı" required className={styles.searchInput} style={{background:'#f8fafc', color:'#1e293b', border:'1px solid #e2e8f0'}} />
            <input name="icon" placeholder="Lucide İkon Adı (örn: LineChart)" className={styles.searchInput} style={{background:'#f8fafc', color:'#1e293b', border:'1px solid #e2e8f0'}} />
            <textarea name="description" placeholder="Açıklama" required rows={4} className={styles.searchInput} style={{background:'#f8fafc', color:'#1e293b', border:'1px solid #e2e8f0', resize:'none'}} />
            <button type="submit" className={styles.topButton} style={{background:'#3b82f6', color:'white', justifyContent:'center', border:'none', marginTop:'0.5rem'}}>
              <Plus size={18} /> Ekle
            </button>
          </form>
        </div>

        {/* Liste */}
        <div className={styles.card}>
          <h3 className={styles.cardHeader} style={{fontSize:'1.1rem'}}>Mevcut Hizmetler</h3>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left'}}>
              <thead>
                <tr style={{borderBottom:'2px solid #e2e8f0'}}>
                  <th style={{padding:'1rem 0.5rem', color:'#64748b'}}>İkon</th>
                  <th style={{padding:'1rem 0.5rem', color:'#64748b'}}>Başlık</th>
                  <th style={{padding:'1rem 0.5rem', color:'#64748b'}}>Açıklama</th>
                  <th style={{padding:'1rem 0.5rem', color:'#64748b', width:'80px'}}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 && <tr><td colSpan={4} style={{padding:'1rem', textAlign:'center', color:'#94a3b8'}}>Henüz hizmet eklenmedi.</td></tr>}
                {services.map(svc => (
                  <tr key={svc.id} style={{borderBottom:'1px solid #f1f5f9'}}>
                    <td style={{padding:'1rem 0.5rem', fontWeight:'600'}}>{svc.icon || '-'}</td>
                    <td style={{padding:'1rem 0.5rem', fontWeight:'600'}}>{svc.title}</td>
                    <td style={{padding:'1rem 0.5rem', color:'#64748b', fontSize:'0.875rem'}}>{svc.description.substring(0, 60)}...</td>
                    <td style={{padding:'1rem 0.5rem'}}>
                      <form action={deleteService}>
                        <input type="hidden" name="id" value={svc.id} />
                        <button type="submit" style={{background:'transparent', color:'#ef4444', border:'none', cursor:'pointer', padding:'0.5rem', display:'flex', alignItems:'center', borderRadius:'4px'}} title="Sil">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
