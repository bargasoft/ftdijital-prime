'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getActiveRole() {
  const cookieStore = await cookies();
  const role = cookieStore.get('mock_user_role')?.value;
  return role || 'ADMIN'; // Varsayılan yetkili
}

export async function getActivePermissions() {
  const roleName = await getActiveRole();
  if (roleName === 'ADMIN') return ['ALL'];

  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) return [];

  try {
    return JSON.parse(role.permissions);
  } catch {
    return [];
  }
}

export async function setActiveUser(role: string) {
  const cookieStore = await cookies();
  cookieStore.set('mock_user_role', role, { path: '/' });
  revalidatePath('/', 'layout'); // Tüm sayfaları yenile
}

export async function getAllUsersForSwitcher() {
  return prisma.user.findMany({
    select: { 
      id: true, 
      name: true, 
      role: { select: { id: true, name: true, permissions: true } } 
    }
  });
}
