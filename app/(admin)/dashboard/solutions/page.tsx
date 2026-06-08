import { getSolutions, addSolution, deleteSolution } from './actions';
import { Plus, Trash2 } from 'lucide-react';
import styles from '../dashboard.module.css';

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div>
      <div className={styles.cardHeader} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{fontSize:'1.5rem', margin:0}}>Çözümler Yönetimi</h2>
      </div>

      <div className={styles.chartsGrid} style={{gridTemplateColumns:'1fr 2fr'}}>
        <div className={styles.card}>
          <h3 className={styles.cardHeader} style={{fontSize:'1.1rem'}}>Yeni Çözüm Ekle</h3>
          <form action={addSolution} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <input name="title" placeholder="Çözüm Başlığı" required className={styles.searchInput} style={{background:'#f8fafc', color:'#1e293b', border:'1px solid #e2e8f0'}} />
            <textarea name="description" placeholder="Açıklama Detayı" required rows={5} className={styles.searchInput} style={{background:'#f8fafc', color:'#1e293b', border:'1px solid #e2e8f0', resize:'none'}} />
            <button type="submit" className={styles.topButton} style={{background:'#3b82f6', color:'white', justifyContent:'center', border:'none', marginTop:'0.5rem'}}>
              <Plus size={18} /> Ekle
            </button>
          </form>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardHeader} style={{fontSize:'1.1rem'}}>Mevcut Çözümler</h3>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left'}}>
              <thead>
                <tr style={{borderBottom:'2px solid #e2e8f0'}}>
                  <th style={{padding:'1rem 0.5rem', color:'#64748b'}}>Başlık</th>
                  <th style={{padding:'1rem 0.5rem', color:'#64748b'}}>Açıklama</th>
                  <th style={{padding:'1rem 0.5rem', color:'#64748b', width:'80px'}}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {solutions.length === 0 && <tr><td colSpan={3} style={{padding:'1rem', textAlign:'center', color:'#94a3b8'}}>Henüz çözüm eklenmedi.</td></tr>}
                {solutions.map(sol => (
                  <tr key={sol.id} style={{borderBottom:'1px solid #f1f5f9'}}>
                    <td style={{padding:'1rem 0.5rem', fontWeight:'600'}}>{sol.title}</td>
                    <td style={{padding:'1rem 0.5rem', color:'#64748b', fontSize:'0.875rem'}}>{sol.description.substring(0, 80)}...</td>
                    <td style={{padding:'1rem 0.5rem'}}>
                      <form action={deleteSolution}>
                        <input type="hidden" name="id" value={sol.id} />
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
