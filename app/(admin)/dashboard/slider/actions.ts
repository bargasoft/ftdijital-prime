'use server'

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addSlider(formData: FormData) {
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const btnText = formData.get('btnText') as string;
  const imageFile = formData.get('imageFile') as File | null;
  
  if (!title) return;

  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const fs = await import('fs');
    const path = await import('path');
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try { await fs.promises.access(uploadDir); } catch { await fs.promises.mkdir(uploadDir, { recursive: true }); }
    
    const filepath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filepath, buffer);
    
    imageUrl = `/uploads/${filename}`;
  }

  await prisma.slider.create({
    data: { title, subtitle, btnText, imageUrl }
  });

  revalidatePath('/dashboard/slider');
  revalidatePath('/'); // Ana sayfayı da güncelle
}

export async function deleteSlider(id: string) {
  await prisma.slider.delete({ where: { id } });
  revalidatePath('/dashboard/slider');
  revalidatePath('/');
}
