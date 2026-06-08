import { getDeals, getCustomers, addDeal, deleteDeal } from '../actions';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import styles from '../../dashboard.module.css';

export default async function DealsPage() {
  const deals = await getDeals();
  const customers = await getCustomers();

  return (
    <div className={styles.card}>
      <h2 className={styles.cardHeader}>Fırsatlar / Teklifler</h2>

      {/* Ekleme Formu */}
      <form action={addDeal} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '3rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px'}}>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Fırsat/Teklif Başlığı *</label>
          <input type="text" name="title" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>İlgili Müşteri *</label>
          <select name="customerId" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white'}}>
            <option value="">Seçiniz...</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Bütçe/Fiyat (₺)</label>
          <input type="number" name="value" defaultValue={0} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Aşama</label>
          <select name="stage" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white'}}>
            <option value="NEW">Yeni Fırsat</option>
            <option value="PROPOSAL">Teklif Verildi</option>
            <option value="WON">Kazanıldı</option>
            <option value="LOST">Kaybedildi</option>
          </select>
        </div>
        <div style={{gridColumn: '2 / -1', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <button type="submit" style={{background: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500}}>
            <Plus size={18} /> Fırsat Ekle
          </button>
        </div>
      </form>

      {/* Listeleme */}
      {deals.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem', color: '#94a3b8'}}>Henüz fırsat eklenmemiş.</div>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '0.85rem'}}>
                <th style={{padding: '1rem 0.5rem'}}>FIRSAT BAŞLIĞI</th>
                <th style={{padding: '1rem 0.5rem'}}>MÜŞTERİ</th>
                <th style={{padding: '1rem 0.5rem'}}>BÜTÇE</th>
                <th style={{padding: '1rem 0.5rem'}}>AŞAMA</th>
                <th style={{padding: '1rem 0.5rem', textAlign: 'right'}}>İŞLEM</th>
              </tr>
            </thead>
            <tbody>
              {deals.map(d => (
                <tr key={d.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                  <td style={{padding: '1rem 0.5rem'}}>
                    <div style={{fontWeight: 500, color: '#0f172a'}}>{d.title}</div>
                    <div style={{fontSize: '0.75rem', color: '#64748b'}}>{d.createdAt.toLocaleDateString('tr-TR')}</div>
                  </td>
                  <td style={{padding: '1rem 0.5rem', fontSize: '0.85rem'}}>
                    {/* @ts-expect-error Types might not sync until re-generation */}
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}><Briefcase size={12}/> {d.customer?.name}</div>
                  </td>
                  <td style={{padding: '1rem 0.5rem', fontWeight: 600, color: '#3b82f6'}}>
                    {d.value.toLocaleString('tr-TR')} ₺
                  </td>
                  <td style={{padding: '1rem 0.5rem'}}>
                    <span style={{
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      background: d.stage === 'WON' ? '#dcfce7' : d.stage === 'LOST' ? '#fecaca' : d.stage === 'PROPOSAL' ? '#fef08a' : '#e0e7ff',
                      color: d.stage === 'WON' ? '#166534' : d.stage === 'LOST' ? '#991b1b' : d.stage === 'PROPOSAL' ? '#854d0e' : '#3730a3'
                    }}>
                      {d.stage === 'WON' ? 'Kazanıldı' : d.stage === 'LOST' ? 'Kaybedildi' : d.stage === 'PROPOSAL' ? 'Teklif Verildi' : 'Yeni'}
                    </span>
                  </td>
                  <td style={{padding: '1rem 0.5rem', textAlign: 'right'}}>
                    <form action={deleteDeal.bind(null, d.id)}>
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
