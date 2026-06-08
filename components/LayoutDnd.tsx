'use client';

import { useState, useRef } from 'react';
import { GripVertical, Save } from 'lucide-react';
import { updateSettings } from '@/app/(admin)/dashboard/settings/actions'; // Reuse actions

export default function LayoutDnd({ initialLayout }: { initialLayout: string[] }) {
  const [items, setItems] = useState<string[]>(initialLayout.length > 0 ? initialLayout : ['slider', 'services', 'solutions']);
  const [isSaving, setIsSaving] = useState(false);
  
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    let _items = [...items];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);
    
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_items);
  };

  const getLabel = (key: string) => {
    switch(key) {
      case 'slider': return 'Slider (Ana Görsel ve Butonlar)';
      case 'services': return 'Hizmetlerimiz (İkonlu Grid)';
      case 'solutions': return 'Çözümlerimiz (Kategorili Grid)';
      default: return key;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append('home_layout', JSON.stringify(items));
    await updateSettings(formData);
    setIsSaving(false);
    alert('Sayfa düzeni kaydedildi!');
  };

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem'}}>
        {items.map((item, index) => (
          <div
            key={item}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            style={{
              padding: '1rem',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'grab',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <GripVertical size={20} color="#94a3b8" />
            <span style={{fontWeight: 600, color: '#334155'}}>{getLabel(item)}</span>
          </div>
        ))}
      </div>

      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button onClick={handleSave} disabled={isSaving} style={{background: '#2563eb', color: 'white', padding: '0.75rem 2.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, opacity: isSaving ? 0.7 : 1}}>
          <Save size={18} /> {isSaving ? 'Kaydediliyor...' : 'Düzeni Kaydet'}
        </button>
      </div>
    </div>
  );
}
