'use client';

import { useEffect, useState } from 'react';
import { getAllUsersForSwitcher, setActiveUser, getActiveRole } from './auth-actions';
import { UserCircle2 } from 'lucide-react';

export default function UserSwitcher() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentRole, setCurrentRole] = useState('ADMIN');

  useEffect(() => {
    async function loadData() {
      const dbUsers = await getAllUsersForSwitcher();
      setUsers(dbUsers);
      const role = await getActiveRole();
      setCurrentRole(role);
    }
    loadData();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setCurrentRole(newRole);
    await setActiveUser(newRole);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <UserCircle2 size={16} color="#64748b" />
      <select 
        value={currentRole}
        onChange={handleChange}
        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#0f172a', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
      >
        <option value="ADMIN">Varsayılan Yetkili (Admin)</option>
        {users.map(u => (
          <option key={u.id} value={u.role?.name || 'GUEST'}>
            {u.name} ({u.role?.name === 'ADMIN' ? 'Yönetici' : (u.role?.name || 'Yetkisiz')})
          </option>
        ))}
      </select>
    </div>
  );
}
