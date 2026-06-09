'use client';

import { useState, useMemo } from 'react';
import { updateTicketStatus, deleteTicket, bulkDeleteTickets, bulkUpdateTicketStatus } from './actions';
import { Search, ChevronDown, ChevronUp, Check, X, User, Calendar, MessageSquare, AlertCircle, Trash2, HeadphonesIcon, Filter } from 'lucide-react';

export default function SupportDataTable({ tickets, canDelete = false, canClose = false }: { tickets: any[], canDelete?: boolean, canClose?: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('NOT_CLOSED');
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Sıralama
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>({ key: 'createdAt', direction: 'desc' });

  // Status renk ve metinleri
  const statusMap: any = {
    'OPEN': { text: 'Açık', bg: '#fef2f2', color: '#ef4444' },
    'IN_PROGRESS': { text: 'İşlemde', bg: '#eff6ff', color: '#3b82f6' },
    'WAITING': { text: 'Cevap Bekliyor', bg: '#fffbeb', color: '#f59e0b' },
    'CLOSED': { text: 'Çözüldü', bg: '#f0fdf4', color: '#22c55e' }
  };

  const priorityMap: any = {
    'HIGH': { text: 'Acil', color: '#ef4444' },
    'NORMAL': { text: 'Normal', color: '#3b82f6' },
    'LOW': { text: 'Düşük', color: '#64748b' }
  };

  const priorityWeight: any = { 'HIGH': 3, 'NORMAL': 2, 'LOW': 1 };

  // Filtreleme ve Sıralama
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter(t => {
      const matchSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' 
                            ? true 
                            : statusFilter === 'NOT_CLOSED' 
                              ? t.status !== 'CLOSED' 
                              : t.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        let valA, valB;
        if (sortConfig.key === 'customer') { valA = a.customer.name; valB = b.customer.name; }
        else if (sortConfig.key === 'priority') { valA = priorityWeight[a.priority] || 0; valB = priorityWeight[b.priority] || 0; }
        else { valA = a[sortConfig.key]; valB = b[sortConfig.key]; }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [tickets, searchTerm, statusFilter, sortConfig]);

  const toggleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredAndSortedTickets.map(t => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Seçili ${selectedIds.length} bileti silmek istediğinize emin misiniz?`)) {
      await bulkDeleteTickets(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleBulkStatus = async (status: string) => {
    await bulkUpdateTicketStatus(selectedIds, status);
    setSelectedIds([]);
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) return <ChevronDown size={14} style={{ opacity: 0.3 }} />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  // Dinamik yetki (isAdmin) kullanıldığı için manuel kontrol kaldırıldı.

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Üst Araç Çubuğu */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: '#fff', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', gap: '1rem' }}>
        
        {/* Arama ve Filtre */}
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Müşteri veya konu ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Filter size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ padding: '0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', color: '#0f172a', appearance: 'none', cursor: 'pointer' }}
            >
              <option value="NOT_CLOSED">Açık ve İşlemdekiler</option>
              <option value="ALL">Tüm Durumlar</option>
              <option value="OPEN">Sadece Açık</option>
              <option value="IN_PROGRESS">Sadece İşlemde</option>
              <option value="WAITING">Sadece Bekleyen</option>
              <option value="CLOSED">Sadece Çözüldü</option>
            </select>
          </div>
        </div>

        {/* Toplu İşlem Menüsü */}
        {selectedIds.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e40af', marginRight: '0.5rem' }}>{selectedIds.length} Seçili</span>
            <select 
              onChange={(e) => {
                if (e.target.value !== '') handleBulkStatus(e.target.value);
                e.target.value = ''; // reset
              }}
              style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #93c5fd', outline: 'none', fontSize: '0.85rem', cursor: 'pointer', background: '#fff' }}
            >
              <option value="">Durum Değiştir...</option>
              <option value="OPEN">Açık Yap</option>
              <option value="IN_PROGRESS">İşlemde Yap</option>
              <option value="WAITING">Bekliyor Yap</option>
              <option value="CLOSED">Çözüldü Yap</option>
            </select>
            {canDelete && (
              <button onClick={handleBulkDelete} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Trash2 size={14} /> Desteği Sil
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tablo */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
              <tr>
                <th style={{ padding: '1.25rem 1rem', width: '40px' }}>
                  <input type="checkbox" onChange={handleSelectAll} checked={filteredAndSortedTickets.length > 0 && selectedIds.length === filteredAndSortedTickets.length} style={{ cursor: 'pointer' }} />
                </th>
                <th onClick={() => toggleSort('customer')} style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Müşteri <SortIcon columnKey="customer" /></div>
                </th>
                <th onClick={() => toggleSort('subject')} style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Konu <SortIcon columnKey="subject" /></div>
                </th>
                <th onClick={() => toggleSort('priority')} style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Öncelik <SortIcon columnKey="priority" /></div>
                </th>
                <th onClick={() => toggleSort('status')} style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Durum <SortIcon columnKey="status" /></div>
                </th>
                <th onClick={() => toggleSort('createdAt')} style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Geliş Tarihi <SortIcon columnKey="createdAt" /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTickets.map(ticket => (
                <tr key={ticket.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', cursor: 'pointer', background: selectedIds.includes(ticket.id) ? '#f8fafc' : 'transparent' }} onClick={() => setSelectedTicket(ticket)} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = selectedIds.includes(ticket.id) ? '#f8fafc' : 'transparent'}>
                  <td style={{ padding: '1rem', width: '40px' }} onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.includes(ticket.id)} onChange={() => handleSelectOne(ticket.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{ticket.customer.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{ticket.customer.company}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#334155', fontWeight: 500 }}>
                    {ticket.subject}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: priorityMap[ticket.priority]?.color || '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                      <AlertCircle size={14} />
                      {priorityMap[ticket.priority]?.text || ticket.priority}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      background: statusMap[ticket.status]?.bg || '#f1f5f9', 
                      color: statusMap[ticket.status]?.color || '#475569', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '99px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600 
                    }}>
                      {statusMap[ticket.status]?.text || ticket.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                    {new Date(ticket.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    {canDelete ? (
                      <form action={deleteTicket} onClick={e => e.stopPropagation()}>
                        <input type="hidden" name="id" value={ticket.id} />
                        <button type="submit" style={{ background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', transition: 'all 0.2s' }} title="Desteği Sil">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    ) : (
                      ticket.status === 'CLOSED' && canClose && (
                        <form action={deleteTicket} onClick={e => e.stopPropagation()}>
                          <input type="hidden" name="id" value={ticket.id} />
                          <button type="submit" style={{ background: '#f1f5f9', color: '#64748b', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', transition: 'all 0.2s' }} title="Desteği Kapat">
                            <X size={18} />
                          </button>
                        </form>
                      )
                    )}
                  </td>
                </tr>
              ))}
              {filteredAndSortedTickets.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    Aranan kritere uygun bilet bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer (Sağdan Açılan Okuma Paneli) */}
      {selectedTicket && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 998 }} onClick={() => setSelectedTicket(null)} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '500px', maxWidth: '100vw', height: '100vh', background: '#fff', zIndex: 999, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.3s ease-out forwards' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: '#eff6ff', color: '#3b82f6', padding: '0.75rem', borderRadius: '12px' }}>
                  <HeadphonesIcon size={24} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Talep Detayı</h2>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Bilet ID: {selectedTicket.id.substring(0,8)}...</div>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }} onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '2rem 1.5rem', flex: 1, overflowY: 'auto' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                {selectedTicket.subject}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
                  <User size={16} /> <span style={{ fontWeight: 600 }}>Müşteri:</span> {selectedTicket.customer.name} ({selectedTicket.customer.company})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
                  <AlertCircle size={16} /> <span style={{ fontWeight: 600 }}>Öncelik:</span> 
                  <span style={{ color: priorityMap[selectedTicket.priority]?.color, fontWeight: 700 }}>{priorityMap[selectedTicket.priority]?.text || selectedTicket.priority}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
                  <Calendar size={16} /> <span style={{ fontWeight: 600 }}>Tarih:</span> {new Date(selectedTicket.createdAt).toLocaleString('tr-TR')}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#1e293b', fontWeight: 700 }}>
                  <MessageSquare size={18} /> Müşteri Mesajı
                </div>
                <div style={{ padding: '1.25rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', color: '#334155', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {selectedTicket.message}
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Bilet Durumunu Güncelle</div>
                <form action={async (formData) => {
                  await updateTicketStatus(formData);
                  const newStatus = formData.get('status');
                  setSelectedTicket({...selectedTicket, status: newStatus});
                  
                  // Reset select bulk check just in case it bugs
                  setSelectedIds([]);
                }} style={{ display: 'flex', gap: '1rem' }}>
                  <input type="hidden" name="id" value={selectedTicket.id} />
                  <select name="status" defaultValue={selectedTicket.status} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}>
                    <option value="OPEN">Açık</option>
                    <option value="IN_PROGRESS">İşlemde</option>
                    <option value="WAITING">Cevap Bekliyor</option>
                    <option value="CLOSED">Çözüldü</option>
                  </select>
                  <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '0 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    Güncelle
                  </button>
                </form>
              </div>
              
              {canDelete ? (
                <form action={async () => {
                  if (confirm('Bu desteği kalıcı olarak silmek istediğinize emin misiniz?')) {
                    const formData = new FormData();
                    formData.append('id', selectedTicket.id);
                    await deleteTicket(formData);
                    setSelectedTicket(null);
                  }
                }}>
                  <button type="submit" style={{ background: '#fef2f2', color: '#ef4444', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trash2 size={18} /> Desteği Sil
                  </button>
                </form>
              ) : (
                selectedTicket.status === 'CLOSED' && canClose && (
                  <form action={async () => {
                    const formData = new FormData();
                    formData.append('id', selectedTicket.id);
                    await deleteTicket(formData);
                    setSelectedTicket(null);
                  }}>
                    <button type="submit" style={{ background: '#f1f5f9', color: '#64748b', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <X size={18} /> Desteği Kapat
                    </button>
                  </form>
                )
              )}

            </div>
          </div>
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}

    </div>
  );
}
