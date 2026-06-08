'use server'

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addSlider(formData: FormData) {
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const btnText = formData.get('btnText') as string;
  
  await prisma.slider.create({
    data: {
      title,
      subtitle,
      btnText,
      bgGradient: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)'
    }
  });

  revalidatePath('/dashboard/slider');
  revalidatePath('/'); // Ana sayfayı da güncelle
}

export async function deleteSlider(id: string) {
  await prisma.slider.delete({ where: { id } });
  revalidatePath('/dashboard/slider');
  revalidatePath('/');
}
