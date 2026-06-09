'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getTickets() {
  return prisma.supportTicket.findMany({
    include: {
      customer: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function updateTicketStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  
  if (!id || !status) return;

  await prisma.supportTicket.update({
    where: { id },
    data: { status }
  });

  revalidatePath('/dashboard/crm/support');
}

export async function deleteTicket(formData: FormData) {
  const id = formData.get('id') as string;
  
  if (!id) return;

  await prisma.supportTicket.delete({
    where: { id }
  });

  revalidatePath('/dashboard/crm/support');
}

export async function bulkDeleteTickets(ids: string[]) {
  if (!ids || ids.length === 0) return;
  await prisma.supportTicket.deleteMany({
    where: { id: { in: ids } }
  });
  revalidatePath('/dashboard/crm/support');
}

export async function bulkUpdateTicketStatus(ids: string[], status: string) {
  if (!ids || ids.length === 0 || !status) return;
  await prisma.supportTicket.updateMany({
    where: { id: { in: ids } },
    data: { status }
  });
  revalidatePath('/dashboard/crm/support');
}
