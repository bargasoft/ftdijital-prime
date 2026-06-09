import { getCategories, addCategory, deleteCategory } from './actions';
import { Plus, Trash2, Tag, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Kategori Yönetimi | FT Dijital Prime',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize:'1.8rem', fontWeight: 800, color: '#0f172a', margin:0, letterSpacing: '-0.02em'}}>Kategori Yönetimi</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Çözümlerinizi gruplandırmak için kullanılan ana kategorileri (ERP, Kobi vb.) yönetin.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 2fr)', gap: '2rem', alignItems: 'start' }}>
        
        {/* FORM ALANI */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
             <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '8px', color: '#3b82f6' }}><Plus size={20} /></div>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Yeni Kategori Ekle</h3>
          </div>
          
          <form action={addCategory} style={{display:'flex', flexDirection:'column', gap:'1.25rem'}}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}><Tag size={16} /> Kategori Adı</label>
              <input name="name" placeholder="Örn: E-Ticaret Çözümleri" required style={{width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', outline: 'none', transition: 'all 0.2s', fontSize: '0.95rem'}} />
            </div>

            <button type="submit" style={{background:'linear-gradient(135deg, #3b82f6, #6366f1)', color:'white', border:'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.4)', transition: 'transform 0.2s'}}>
              <Plus size={18} /> Kategoriyi Kaydet
            </button>
          </form>
        </div>

        {/* LISTE ALANI */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
             <div style={{ background: '#f0fdf4', padding: '0.5rem', borderRadius: '8px', color: '#22c55e' }}><Tag size={20} /></div>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Mevcut Kategoriler</h3>
          </div>

          <div style={{ background: '#fffbeb', color: '#b45309', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} /> Bir kategoriyi sildiğinizde, o kategoriye bağlı olan <strong>tüm çözümler de silinir!</strong> Lütfen dikkatli işlem yapın.
          </div>
          
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left'}}>
              <thead>
                <tr style={{background: '#f8fafc', borderRadius: '8px'}}>
                  <th style={{padding:'1rem', color:'#475569', fontWeight: 600, fontSize: '0.9rem'}}>Kategori Adı</th>
                  <th style={{padding:'1rem', color:'#475569', fontWeight: 600, fontSize: '0.9rem', width:'80px', textAlign: 'center'}}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 && <tr><td colSpan={2} style={{padding:'2rem', textAlign:'center', color:'#94a3b8'}}>Sistemde kayıtlı kategori bulunmuyor.</td></tr>}
                {categories.map(cat => (
                  <tr key={cat.id} style={{borderBottom:'1px solid #f1f5f9', transition: 'background 0.2s'}}>
                    <td style={{padding: '1.25rem 1rem', verticalAlign: 'middle'}}>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.05rem' }}>{cat.name}</div>
                    </td>
                    <td style={{padding: '1.25rem 1rem', verticalAlign: 'middle', textAlign: 'center'}}>
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={cat.id} />
                        <button type="submit" style={{background:'#fef2f2', color:'#ef4444', border:'1px solid #fee2e2', cursor:'pointer', padding:'0.6rem', display:'inline-flex', alignItems:'center', justifyContent: 'center', borderRadius:'8px', transition: 'all 0.2s'}} title="Kategoriyi ve Bağlı Çözümleri Sil">
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
