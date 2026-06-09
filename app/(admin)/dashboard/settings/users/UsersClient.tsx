'use client';

import { useState } from 'react';
import { addUser, toggleUserStatus, deleteUser } from './actions';
import { Plus, Trash2, Shield, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function UsersClient({ users, availableRoles = [] }: { users: any[], availableRoles?: any[] }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Kullanıcı ve Yetki Yönetimi</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Panele erişebilecek personelleri ve onların sistem yetkilerini (Rollerini) yönetin.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ background: '#0f172a', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
        >
          {isAdding ? <XCircle size={18} /> : <Plus size={18} />}
          {isAdding ? 'İptal' : 'Yeni Kullanıcı Ekle'}
        </button>
      </div>

      {isAdding && (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.1rem' }}>Yeni Kullanıcı Oluştur</h3>
          <form action={async (formData) => {
            await addUser(formData);
            setIsAdding(false);
          }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Ad Soyad</label>
              <input type="text" name="name" required placeholder="Örn: Ahmet Personel" style={{ width: '100%', height: '45px', padding: '0 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>E-posta</label>
              <input type="email" name="email" required placeholder="ahmet@firma.com" style={{ width: '100%', height: '45px', padding: '0 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Geçici Şifre</label>
              <input type="text" name="password" required placeholder="******" style={{ width: '100%', height: '45px', padding: '0 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Sistem Yetkisi (Rol)</label>
              <select name="roleId" style={{ width: '100%', height: '45px', padding: '0 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                {availableRoles.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" style={{ background: '#3b82f6', color: '#fff', padding: '0 1.5rem', borderRadius: '8px', border: '1px solid #3b82f6', fontWeight: 600, cursor: 'pointer', height: '45px', boxSizing: 'border-box' }}>
              Kaydet
            </button>
          </form>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>Personel</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>Yetki (Rol)</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>Durum</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textAlign: 'right' }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  {user.role?.name === 'ADMIN' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#fef2f2', color: '#ef4444', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>
                      <ShieldAlert size={14} /> Yönetici
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#eff6ff', color: '#3b82f6', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>
                      <Shield size={14} /> {user.role?.name || 'Yetkisiz'}
                    </span>
                  )}
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <button 
                    onClick={() => toggleUserStatus(user.id, !user.isActive)}
                    style={{ 
                      background: user.isActive ? '#f0fdf4' : '#f1f5f9', 
                      color: user.isActive ? '#22c55e' : '#94a3b8', 
                      border: '1px solid',
                      borderColor: user.isActive ? '#bbf7d0' : '#e2e8f0',
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '99px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    {user.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {user.isActive ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button 
                    onClick={() => {
                      if(confirm('Kullanıcıyı tamamen silmek istediğinize emin misiniz?')) {
                        deleteUser(user.id);
                      }
                    }}
                    style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }} 
                    title="Kullanıcıyı Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Sistemde kayıtlı kullanıcı bulunmuyor.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
