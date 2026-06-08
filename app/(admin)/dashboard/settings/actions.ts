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
    if (key.startsWith('$ACTION')) continue; // Next.js gizli inputlarını atla
    
    const value = formData.get(key) as string;
    
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  
  // Public site cache ve Dashboard cache'i yenile
  revalidatePath('/', 'layout');
}
