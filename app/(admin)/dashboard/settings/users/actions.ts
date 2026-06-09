'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  return prisma.user.findMany({
    include: { role: true },
    orderBy: { id: 'desc' }
  });
}

export async function addUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const roleId = formData.get('roleId') as string;
  
  if (!name || !email || !password || !roleId) return;

  await prisma.user.create({
    data: { name, email, password, roleId, isActive: true }
  });

  revalidatePath('/dashboard/settings/users');
}

export async function toggleUserStatus(id: string, isActive: boolean) {
  await prisma.user.update({
    where: { id },
    data: { isActive }
  });
  revalidatePath('/dashboard/settings/users');
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id }
  });
  revalidatePath('/dashboard/settings/users');
}
