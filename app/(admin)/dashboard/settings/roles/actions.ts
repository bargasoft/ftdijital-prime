'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getRoles() {
  return prisma.role.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function addRole(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const rawPermissions = formData.getAll('permissions') as string[];
  
  if (!name) return;

  await prisma.role.create({
    data: {
      name,
      description,
      permissions: JSON.stringify(rawPermissions),
    }
  });

  revalidatePath('/dashboard/settings/roles');
  revalidatePath('/dashboard/settings/users');
}

export async function updateRolePermissions(roleId: string, permissions: string[]) {
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (role?.isSystem && role.name === 'ADMIN') {
    // Admin rolü kilitli, yetkileri değiştirilemez.
    return;
  }

  await prisma.role.update({
    where: { id: roleId },
    data: {
      permissions: JSON.stringify(permissions)
    }
  });
  
  revalidatePath('/dashboard/settings/roles');
  revalidatePath('/dashboard/settings/users');
}

export async function deleteRole(roleId: string) {
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (role?.isSystem) {
    return; // Sistem rolleri silinemez
  }

  await prisma.role.delete({
    where: { id: roleId }
  });

  revalidatePath('/dashboard/settings/roles');
  revalidatePath('/dashboard/settings/users');
}

// Varsayılan rolleri oluşturmak için bir kurulum eylemi
export async function seedRoles() {
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  if (!adminRole) {
    await prisma.role.create({
      data: {
        name: 'ADMIN',
        description: 'Tam Yetkili Yönetici (Sistem)',
        permissions: JSON.stringify(['ALL']),
        isSystem: true
      }
    });
  }

  const supportRole = await prisma.role.findUnique({ where: { name: 'SUPPORT_STAFF' } });
  if (!supportRole) {
    await prisma.role.create({
      data: {
        name: 'SUPPORT_STAFF',
        description: 'Destek Personeli',
        permissions: JSON.stringify(['VIEW_TICKETS', 'CLOSE_TICKETS']),
        isSystem: true
      }
    });
  }
}
