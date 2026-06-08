import { getCustomers, addCustomer, deleteCustomer } from '../actions';
import { Plus, Trash2, Mail, Phone, Building } from 'lucide-react';
import styles from '../../dashboard.module.css';

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className={styles.card}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2 className={styles.cardHeader} style={{marginBottom: 0}}>Müşteriler & Potansiyeller</h2>
      </div>

      {/* Ekleme Formu */}
      <form action={addCustomer} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px'}}>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Ad Soyad / Firma Adı *</label>
          <input type="text" name="name" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Durum</label>
          <select name="status" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white'}}>
            <option value="LEAD">Potansiyel (Lead)</option>
            <option value="ACTIVE">Aktif Müşteri</option>
            <option value="CHURNED">Pasif Müşteri</option>
          </select>
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>E-Posta</label>
          <input type="email" name="email" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Telefon</label>
          <input type="text" name="phone" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
        </div>
        <div style={{gridColumn: '1 / -1'}}>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Özel Notlar</label>
          <textarea name="notes" rows={2} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}></textarea>
        </div>
        <div style={{gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" style={{background: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500}}>
            <Plus size={18} /> Yeni Müşteri Ekle
          </button>
        </div>
      </form>

      {/* Listeleme */}
      {customers.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem', color: '#94a3b8'}}>Henüz müşteri eklenmemiş.</div>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '0.85rem'}}>
                <th style={{padding: '1rem 0.5rem'}}>MÜŞTERİ</th>
                <th style={{padding: '1rem 0.5rem'}}>İLETİŞİM</th>
                <th style={{padding: '1rem 0.5rem'}}>DURUM</th>
                <th style={{padding: '1rem 0.5rem'}}>EKLEME TARİHİ</th>
                <th style={{padding: '1rem 0.5rem', textAlign: 'right'}}>İŞLEM</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                  <td style={{padding: '1rem 0.5rem'}}>
                    <div style={{fontWeight: 500, color: '#0f172a'}}>{c.name}</div>
                    {c.company && <div style={{fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.2rem'}}><Building size={12}/> {c.company}</div>}
                  </td>
                  <td style={{padding: '1rem 0.5rem', fontSize: '0.85rem'}}>
                    {c.email && <div style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}><Mail size={12}/> {c.email}</div>}
                    {c.phone && <div style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}><Phone size={12}/> {c.phone}</div>}
                  </td>
                  <td style={{padding: '1rem 0.5rem'}}>
                    <span style={{
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      background: c.status === 'ACTIVE' ? '#dcfce7' : c.status === 'CHURNED' ? '#fecaca' : '#e0e7ff',
                      color: c.status === 'ACTIVE' ? '#166534' : c.status === 'CHURNED' ? '#991b1b' : '#3730a3'
                    }}>
                      {c.status === 'ACTIVE' ? 'Aktif' : c.status === 'CHURNED' ? 'Pasif' : 'Potansiyel'}
                    </span>
                  </td>
                  <td style={{padding: '1rem 0.5rem', color: '#64748b', fontSize: '0.85rem'}}>
                    {c.createdAt.toLocaleDateString('tr-TR')}
                  </td>
                  <td style={{padding: '1rem 0.5rem', textAlign: 'right'}}>
                    <form action={deleteCustomer.bind(null, c.id)}>
                      <button type="submit" style={{background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem'}} title="Sil">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
