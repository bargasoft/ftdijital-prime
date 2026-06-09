'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  return prisma.solutionCategory.findMany({ orderBy: { order: 'asc' } });
}

export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return;
  await prisma.solutionCategory.create({ data: { name, isActive: true } });
  revalidatePath('/dashboard/categories');
  revalidatePath('/dashboard/solutions'); // Formları da güncelle
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  // Kategori silindiğinde ona bağlı olan çözümler Prisma Cascade ayarı sayesinde otomatik silinir
  // ya da hata fırlatabiliriz. Biz Cascade ayarlamıştık.
  await prisma.solutionCategory.delete({ where: { id } });
  revalidatePath('/dashboard/categories');
  revalidatePath('/dashboard/solutions');
}
