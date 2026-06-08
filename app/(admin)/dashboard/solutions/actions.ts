'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getSolutions() {
  return prisma.solution.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addSolution(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  if (!title || !description) return;
  await prisma.solution.create({ data: { title, description } });
  revalidatePath('/dashboard/solutions');
}

export async function deleteSolution(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  await prisma.solution.delete({ where: { id } });
  revalidatePath('/dashboard/solutions');
}
