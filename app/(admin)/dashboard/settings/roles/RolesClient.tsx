'use client';

import { useState } from 'react';
import { addRole, deleteRole, updateRolePermissions } from './actions';
import { Plus, Trash2, Shield, Key, AlertCircle } from 'lucide-react';

const AVAILABLE_PERMISSIONS = [
  { id: 'VIEW_TICKETS', label: 'Biletleri Görüntüleme', category: 'Destek' },
  { id: 'CLOSE_TICKETS', label: 'Biletleri Çözme/Kapatma', category: 'Destek' },
  { id: 'DELETE_TICKETS', label: 'Biletleri Tamamen Silme', category: 'Destek' },
  { id: 'MANAGE_USERS', label: 'Personel (Kullanıcı) Ekleme/Silme', category: 'Ayarlar' },
  { id: 'MANAGE_ROLES', label: 'Yetki (Rol) Yönetimi', category: 'Ayarlar' },
  { id: 'MANAGE_SOLUTIONS', label: 'Çözümler Yönetimi', category: 'İçerik' },
  { id: 'MANAGE_SERVICES', label: 'Hizmetler Yönetimi', category: 'İçerik' },
  { id: 'MANAGE_WEBDESIGN', label: 'Web Tasarım Bölümleri', category: 'Web' },
];

export default function RolesClient({ roles }: { roles: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const togglePermission = async (roleId: string, currentPermissions: string, permissionId: string) => {
    let parsed = [];
    try { parsed = JSON.parse(currentPermissions); } catch {}
    
    if (parsed.includes(permissionId)) {
      parsed = parsed.filter((p: string) => p !== permissionId);
    } else {
      parsed.push(permissionId);
    }
    await updateRolePermissions(roleId, parsed);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Rol ve Yetki Yönetimi</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Departmanlara özel yeni roller oluşturun ve erişebilecekleri modülleri kısıtlayın.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ background: '#0f172a', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Yeni Rol Ekle
        </button>
      </div>

      {isAdding && (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Yeni Personel Rolü Oluştur</h3>
          <form action={async (formData) => {
            await addRole(formData);
            setIsAdding(false);
          }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Rol Adı (Örn: İçerik Yöneticisi)</label>
              <input type="text" name="name" required style={{ width: '100%', height: '45px', padding: '0 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Açıklama (İsteğe Bağlı)</label>
              <input type="text" name="description" style={{ width: '100%', height: '45px', padding: '0 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ background: '#3b82f6', color: '#fff', padding: '0 1.5rem', borderRadius: '8px', border: '1px solid #3b82f6', fontWeight: 600, cursor: 'pointer', height: '45px', boxSizing: 'border-box' }}>
              Kaydet
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {roles.map(role => {
          let perms: string[] = [];
          try { perms = JSON.parse(role.permissions); } catch {}
          
          return (
            <div key={role.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div 
                style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: expandedRole === role.id ? '#f8fafc' : '#fff' }}
                onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={18} color={role.isSystem ? '#ef4444' : '#3b82f6'} />
                    <h3 style={{ margin: 0, color: '#0f172a' }}>{role.name}</h3>
                    {role.isSystem && <span style={{ background: '#fee2e2', color: '#ef4444', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '99px', fontWeight: 600 }}>Sistem Rolü</span>}
                  </div>
                  {role.description && <p style={{ margin: '0.3rem 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>{role.description}</p>}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    <Key size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
                    {perms.includes('ALL') ? 'Tüm Yetkiler' : `${perms.length} Özel Yetki`}
                  </div>
                  
                  {!role.isSystem && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if(confirm('Rolü silmek istediğinize emin misiniz?')) deleteRole(role.id);
                      }}
                      style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>

              {expandedRole === role.id && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', background: '#fafafa' }}>
                  {perms.includes('ALL') ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontWeight: 600, background: '#f0fdf4', padding: '1rem', borderRadius: '8px' }}>
                      <AlertCircle size={18} /> Bu sistem rolü platformdaki her şeye erişebilir ve izinleri sınırlandırılamaz.
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                      {AVAILABLE_PERMISSIONS.map(p => (
                        <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={perms.includes(p.id)} 
                            onChange={() => togglePermission(role.id, role.permissions, p.id)}
                            style={{ width: '16px', height: '16px' }}
                          />
                          <span style={{ fontSize: '0.9rem', color: '#475569' }}>{p.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
