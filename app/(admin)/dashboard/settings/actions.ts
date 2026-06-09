'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  // Array'den Key-Value objesine çeviriyoruz
  return settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function updateSettings(formData: FormData) {
  const keys = Array.from(formData.keys());
  
  for (const key of keys) {
    if (key.startsWith('$ACTION')) continue;
    
    const value = formData.get(key);
    let finalValue = '';

    if (value instanceof File) {
      if (value.size === 0) continue; // Dosya seçilmediyse atla
      
      const bytes = await value.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${value.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const fs = await import('fs');
      const path = await import('path');
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try { await fs.promises.access(uploadDir); } catch { await fs.promises.mkdir(uploadDir, { recursive: true }); }
      
      const filepath = path.join(uploadDir, filename);
      await fs.promises.writeFile(filepath, buffer);
      
      finalValue = `/uploads/${filename}`;
    } else {
      finalValue = value as string;
    }
    
    await prisma.setting.upsert({
      where: { key },
      update: { value: finalValue },
      create: { key, value: finalValue },
    });
  }
  
  // Public site cache ve Dashboard cache'i yenile
  revalidatePath('/', 'layout');
}
