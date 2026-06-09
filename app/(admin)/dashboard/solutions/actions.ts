'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  return prisma.solutionCategory.findMany({ orderBy: { order: 'asc' } });
}

export async function getSolutions() {
  return prisma.solution.findMany({ 
    orderBy: { id: 'desc' },
    include: { category: true } // Kategori ilişkisini dahil ediyoruz
  });
}

export async function addSolution(formData: FormData) {
  const title = formData.get('title') as string;
  const categoryId = formData.get('categoryId') as string;
  const items = formData.get('items') as string;
  if (!title || !categoryId || !items) return;
  await prisma.solution.create({ data: { title, categoryId, items } });
  revalidatePath('/dashboard/solutions');
}

export async function updateSolution(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const categoryId = formData.get('categoryId') as string;
  const items = formData.get('items') as string;
  if (!id || !title || !categoryId || !items) return;
  await prisma.solution.update({ where: { id }, data: { title, categoryId, items } });
  revalidatePath('/dashboard/solutions');
}

export async function deleteSolution(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  await prisma.solution.delete({ where: { id } });
  revalidatePath('/dashboard/solutions');
}

export async function toggleSolutionStatus(id: string, isActive: boolean) {
  await prisma.solution.update({ where: { id }, data: { isActive } });
  revalidatePath('/dashboard/solutions');
}

export async function bulkDeleteSolutions(ids: string[]) {
  if (!ids.length) return;
  await prisma.solution.deleteMany({ where: { id: { in: ids } } });
  revalidatePath('/dashboard/solutions');
}
