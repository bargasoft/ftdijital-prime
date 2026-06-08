import prisma from '@/lib/db';
import styles from '../dashboard.module.css';
import { ensureMenus, addMenuItem, deleteMenuItem } from './actions';
import { List, Plus, Trash2 } from 'lucide-react';

export default async function MenusManager() {
  const { headerMenu, footerMenu } = await ensureMenus();
  
  const headerItems = await prisma.menuItem.findMany({ where: { menuId: headerMenu.id }, orderBy: { order: 'asc' } });
  const footerItems = await prisma.menuItem.findMany({ where: { menuId: footerMenu.id }, orderBy: { order: 'asc' } });

  const renderMenuEditor = (menuId: string, title: string, items: any[]) => (
    <div className={styles.card} style={{ flex: 1, height: 'fit-content' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#0f172a' }}>{title}</h2>
      
      <form action={addMenuItem} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <input type="hidden" name="menuId" value={menuId} />
        <input name="label" required placeholder="Etiket (Örn: Anasayfa)" style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <input name="url" required placeholder="Link (Örn: /)" style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <input name="order" type="number" placeholder="Sıra" defaultValue="0" style={{ width: '60px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <button type="submit" style={{ background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', padding: '0 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Plus size={16} /> Ekle
        </button>
      </form>

      {items.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '0.9rem' }}>Bu menüde henüz link yok.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map(item => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', alignItems: 'center' }}>
              <div>
                <strong>{item.label}</strong> <span style={{ color: '#64748b', fontSize: '0.85rem' }}>({item.url})</span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '1rem' }}>Sıra: {item.order}</span>
              </div>
              <form action={deleteMenuItem.bind(null, item.id)}>
                <button type="submit" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <List size={28} /> Menü Yönetimi (Menus)
        </h1>
        <p className={styles.subtitle}>Sitenizin üst ve alt menü linklerini buradan yönetebilirsiniz.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem'}}>
        {renderMenuEditor(headerMenu.id, 'Header Menü (Üst Kısım)', headerItems)}
        {renderMenuEditor(footerMenu.id, 'Footer Hızlı Linkler (Alt Kısım)', footerItems)}
      </div>
    </div>
  );
}
