'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function ensureMenus() {
  const headerMenu = await prisma.menu.upsert({
    where: { name: 'header' },
    update: {},
    create: { name: 'header' }
  });
  
  const footerMenu = await prisma.menu.upsert({
    where: { name: 'footer' },
    update: {},
    create: { name: 'footer' }
  });

  return { headerMenu, footerMenu };
}

export async function addMenuItem(formData: FormData) {
  const menuId = formData.get('menuId') as string;
  const label = formData.get('label') as string;
  const url = formData.get('url') as string;
  const order = parseInt((formData.get('order') as string) || '0');

  if (!menuId || !label || !url) return;

  await prisma.menuItem.create({
    data: { menuId, label, url, order }
  });

  revalidatePath('/dashboard/menus');
  revalidatePath('/');
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath('/dashboard/menus');
  revalidatePath('/');
}
