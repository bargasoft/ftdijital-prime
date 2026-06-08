import { getTickets, getCustomers, addTicket, deleteTicket } from '../actions';
import { Plus, Trash2, User } from 'lucide-react';
import styles from '../../dashboard.module.css';

export default async function SupportPage() {
  const tickets = await getTickets();
  const customers = await getCustomers();

  return (
    <div className={styles.card}>
      <h2 className={styles.cardHeader}>Destek Talepleri (Tickets)</h2>

      {/* Ekleme Formu */}
      <form action={addTicket} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px'}}>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Konu Başlığı *</label>
          <input type="text" name="subject" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Müşteri *</label>
          <select name="customerId" required style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white'}}>
            <option value="">Seçiniz...</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Öncelik</label>
          <select name="priority" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white'}}>
            <option value="NORMAL">Normal</option>
            <option value="LOW">Düşük</option>
            <option value="URGENT">Acil</option>
          </select>
        </div>
        <div>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Durum</label>
          <select name="status" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white'}}>
            <option value="OPEN">Açık</option>
            <option value="IN_PROGRESS">İşlemde</option>
            <option value="PENDING">Beklemede</option>
            <option value="RESOLVED">Çözüldü</option>
          </select>
        </div>
        <div style={{gridColumn: '1 / -1'}}>
          <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#64748b'}}>Mesaj / Detay *</label>
          <textarea name="message" required rows={3} style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}></textarea>
        </div>
        <div style={{gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" style={{background: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500}}>
            <Plus size={18} /> Talep Oluştur
          </button>
        </div>
      </form>

      {/* Listeleme */}
      {tickets.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem', color: '#94a3b8'}}>Bekleyen destek talebi bulunmuyor.</div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {tickets.map(t => (
            <div key={t.id} style={{border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                  <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#0f172a'}}>{t.subject}</h3>
                  {/* @ts-expect-error Types might not sync until re-generation */}
                  <div style={{fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><User size={14}/> {t.customer?.name} &bull; {t.createdAt.toLocaleDateString('tr-TR')}</div>
                </div>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <span style={{
                    padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                    background: t.priority === 'URGENT' ? '#fee2e2' : t.priority === 'LOW' ? '#f1f5f9' : '#fef9c3',
                    color: t.priority === 'URGENT' ? '#b91c1c' : t.priority === 'LOW' ? '#475569' : '#a16207'
                  }}>
                    {t.priority === 'URGENT' ? 'Acil' : t.priority === 'LOW' ? 'Düşük' : 'Normal'}
                  </span>
                  <span style={{
                    padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                    background: t.status === 'RESOLVED' ? '#dcfce7' : t.status === 'OPEN' ? '#e0e7ff' : '#f1f5f9',
                    color: t.status === 'RESOLVED' ? '#166534' : t.status === 'OPEN' ? '#3730a3' : '#475569'
                  }}>
                    {t.status === 'RESOLVED' ? 'Çözüldü' : t.status === 'OPEN' ? 'Açık' : t.status === 'IN_PROGRESS' ? 'İşlemde' : 'Beklemede'}
                  </span>
                </div>
              </div>
              <p style={{margin: 0, fontSize: '0.9rem', color: '#334155', background: '#f8fafc', padding: '1rem', borderRadius: '8px'}}>{t.message}</p>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <form action={deleteTicket.bind(null, t.id)}>
                  <button type="submit" style={{background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                    <Trash2 size={14} /> Kaydı Sil
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
