'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// --- CUSTOMERS ---
export async function getCustomers() {
  return prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addCustomer(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const company = formData.get('company') as string;
  const status = formData.get('status') as string || 'LEAD';
  const notes = formData.get('notes') as string;

  await prisma.customer.create({
    data: { name, email, phone, company, status, notes },
  });
  revalidatePath('/dashboard/crm/customers');
}

export async function deleteCustomer(id: string) {
  // Cascading deletes for related deals and tickets
  await prisma.deal.deleteMany({ where: { customerId: id } });
  await prisma.supportTicket.deleteMany({ where: { customerId: id } });
  await prisma.customer.delete({ where: { id } });
  revalidatePath('/dashboard/crm/customers');
}

// --- DEALS ---
export async function getDeals() {
  return prisma.deal.findMany({
    include: { customer: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function addDeal(formData: FormData) {
  const title = formData.get('title') as string;
  const value = parseFloat(formData.get('value') as string) || 0;
  const stage = formData.get('stage') as string || 'NEW';
  const customerId = formData.get('customerId') as string;

  await prisma.deal.create({
    data: { title, value, stage, customerId },
  });
  revalidatePath('/dashboard/crm/deals');
}

export async function deleteDeal(id: string) {
  await prisma.deal.delete({ where: { id } });
  revalidatePath('/dashboard/crm/deals');
}

// --- SUPPORT TICKETS ---
export async function getTickets() {
  return prisma.supportTicket.findMany({
    include: { customer: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function addTicket(formData: FormData) {
  const subject = formData.get('subject') as string;
  const priority = formData.get('priority') as string || 'NORMAL';
  const status = formData.get('status') as string || 'OPEN';
  const message = formData.get('message') as string;
  const customerId = formData.get('customerId') as string;

  await prisma.supportTicket.create({
    data: { subject, priority, status, message, customerId },
  });
  revalidatePath('/dashboard/crm/support');
}

export async function deleteTicket(id: string) {
  await prisma.supportTicket.delete({ where: { id } });
  revalidatePath('/dashboard/crm/support');
}
