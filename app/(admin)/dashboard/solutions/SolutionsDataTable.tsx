'use client';

import { useState, useMemo } from 'react';
import { Plus, Trash2, Edit2, Search, Filter, Eye, ChevronDown, Check, X, Box, Tag, FileText } from 'lucide-react';
import { toggleSolutionStatus, bulkDeleteSolutions, addSolution, updateSolution, deleteSolution } from './actions';

export default function SolutionsDataTable({ initialData, categories }: { initialData: any[], categories: any[] }) {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Computed Data
  const filteredAndSortedData = useMemo(() => {
    let result = [...initialData];
    
    // Search Filter
    if (search) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        item.category.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sortConfig !== null) {
      result.sort((a, b) => {
        const valA = sortConfig.key === 'category' ? a.category.name : a[sortConfig.key];
        const valB = sortConfig.key === 'category' ? b.category.name : b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [initialData, search, sortConfig]);

  // Handlers
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(filteredAndSortedData.map(item => item.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) setSelectedIds(prev => [...prev, id]);
    else setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    await toggleSolutionStatus(id, !currentStatus);
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (confirm(`${selectedIds.length} adet çözümü silmek istediğinize emin misiniz?`)) {
      await bulkDeleteSolutions(selectedIds);
      setSelectedIds([]);
    }
  };

  const openModal = (item: any = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
      
      {/* TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Sol Toolbar (Arama ve Toplu İşlem) */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Çözümlerde Ara..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', outline: 'none', width: '250px', fontSize: '0.9rem' }}
            />
          </div>
          
          {selectedIds.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#3b82f6' }}>{selectedIds.length} seçili</span>
              <button onClick={handleBulkDelete} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>Toplu Sil</button>
            </div>
          )}
        </div>

        {/* Sağ Toolbar (Yeni Ekle) */}
        <button onClick={() => openModal()} style={{background:'linear-gradient(135deg, #3b82f6, #6366f1)', color:'white', border:'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.4)', transition: 'transform 0.2s'}}>
          <Plus size={18} /> Yeni Çözüm Ekle
        </button>
      </div>

      {/* DATA TABLE */}
      <div style={{overflowX:'auto', border: '1px solid #e2e8f0', borderRadius: '12px'}}>
        <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left'}}>
          <thead>
            <tr style={{background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>
              <th style={{padding:'1.2rem 1rem', width: '50px'}}>
                <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === filteredAndSortedData.length && filteredAndSortedData.length > 0} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              </th>
              <th onClick={() => handleSort('title')} style={{padding:'1.2rem 1rem', color:'#475569', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', userSelect: 'none'}}>
                Başlık {sortConfig?.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('category')} style={{padding:'1.2rem 1rem', color:'#475569', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', userSelect: 'none'}}>
                Kategori {sortConfig?.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th style={{padding:'1.2rem 1rem', color:'#475569', fontWeight: 700, fontSize: '0.9rem'}}>Açıklama Detayı</th>
              <th style={{padding:'1.2rem 1rem', color:'#475569', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center'}}>Durum</th>
              <th style={{padding:'1.2rem 1rem', color:'#475569', fontWeight: 700, fontSize: '0.9rem', textAlign: 'right', width:'150px'}}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length === 0 && <tr><td colSpan={6} style={{padding:'3rem', textAlign:'center', color:'#94a3b8', fontSize: '1rem'}}>Kayıt bulunamadı.</td></tr>}
            {filteredAndSortedData.map(sol => (
              <tr key={sol.id} style={{borderBottom:'1px solid #f1f5f9', transition: 'background 0.2s', background: selectedIds.includes(sol.id) ? '#f0fdf4' : 'transparent'}}>
                <td style={{padding: '1.25rem 1rem', verticalAlign: 'middle'}}>
                  <input type="checkbox" checked={selectedIds.includes(sol.id)} onChange={(e) => handleSelectOne(e, sol.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                </td>
                <td style={{padding: '1.25rem 1rem', fontWeight: 600, color: '#1e293b', fontSize: '0.95rem', verticalAlign: 'middle'}}>
                  {sol.title}
                </td>
                <td style={{padding: '1.25rem 1rem', verticalAlign: 'middle'}}>
                  <span style={{ background: '#eff6ff', color: '#2563eb', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>{sol.category?.name || 'Kategorisiz'}</span>
                </td>
                <td style={{padding: '1.25rem 1rem', color: '#64748b', fontSize: '0.9rem', verticalAlign: 'middle'}}>
                  {sol.items ? sol.items.substring(0, 50) : ''}...
                </td>
                <td style={{padding: '1.25rem 1rem', verticalAlign: 'middle', textAlign: 'center'}}>
                  <button onClick={() => handleToggleStatus(sol.id, sol.isActive ?? true)} style={{ background: (sol.isActive ?? true) ? '#22c55e' : '#cbd5e1', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '9999px', color: 'white', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {(sol.isActive ?? true) ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td style={{padding: '1.25rem 1rem', verticalAlign: 'middle', textAlign: 'right'}}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <a href="/cozumlerimiz" target="_blank" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="Sitede Ön İzle">
                      <Eye size={16} />
                    </a>
                    <button onClick={() => openModal(sol)} style={{ background: '#f8fafc', color: '#3b82f6', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="Düzenle">
                      <Edit2 size={16} />
                    </button>
                    <form action={deleteSolution}>
                      <input type="hidden" name="id" value={sol.id} />
                      <button type="submit" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="Kalıcı Olarak Sil">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (Ekleme / Düzenleme Formu) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', width: '500px', maxWidth: '90%', borderRadius: '24px', padding: '2.5rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#f1f5f9', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', color: '#64748b' }}>
              <X size={20} />
            </button>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2rem 0' }}>
              {editingItem ? 'Çözümü Düzenle' : 'Yeni Çözüm Ekle'}
            </h3>

            <form action={editingItem ? updateSolution : addSolution} onSubmit={() => setTimeout(() => setIsModalOpen(false), 200)} style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
              {editingItem && <input type="hidden" name="id" value={editingItem.id} />}
              
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}><Box size={16} /> Çözüm Başlığı</label>
                <input name="title" defaultValue={editingItem?.title || ''} placeholder="Örn: Netsis Wings Entegre" required style={{width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', outline: 'none', fontSize: '1rem'}} />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}><Tag size={16} /> Kategori Adı</label>
                <select name="categoryId" defaultValue={editingItem?.categoryId || ''} required style={{width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', outline: 'none', fontSize: '1rem'}}>
                  <option value="" disabled>Lütfen Kategori Seçin...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}><FileText size={16} /> Kısa Açıklama / Özellikler</label>
                <textarea name="items" defaultValue={editingItem?.items || ''} placeholder="Çözümün işlevi hakkında kısa bilgi..." required rows={4} style={{width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', outline: 'none', resize:'none', fontSize: '1rem', fontFamily: 'inherit'}} />
              </div>

              <button type="submit" style={{background:'linear-gradient(135deg, #3b82f6, #6366f1)', color:'white', border:'none', padding: '1.2rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '1.1rem', boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.4)'}}>
                <Check size={20} /> {editingItem ? 'Değişiklikleri Kaydet' : 'Sisteme Ekle'}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
