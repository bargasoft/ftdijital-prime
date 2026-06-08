'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addPage(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;

  if (!title || !slug) return;

  // Temel slug temizliği
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

  await prisma.page.create({
    data: { title, slug: cleanSlug, content: content || '' },
  });

  revalidatePath('/dashboard/pages');
}

export async function deletePage(id: string) {
  await prisma.page.delete({ where: { id } });
  revalidatePath('/dashboard/pages');
}
