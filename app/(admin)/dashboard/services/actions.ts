'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getServices() {
  return prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addService(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;

  if (!title || !description) return;

  await prisma.service.create({
    data: { title, description, icon },
  });

  revalidatePath('/dashboard/services');
  revalidatePath('/'); // To update public page
}

export async function deleteService(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.service.delete({ where: { id } });
  revalidatePath('/dashboard/services');
  revalidatePath('/');
}
