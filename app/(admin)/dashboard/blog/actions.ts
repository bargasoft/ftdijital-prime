'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getBlogs() {
  return prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addBlog(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const image = formData.get('image') as string;
  if (!title || !content) return;
  await prisma.blog.create({ data: { title, content, image } });
  revalidatePath('/dashboard/blog');
  revalidatePath('/blog');
}

export async function deleteBlog(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  await prisma.blog.delete({ where: { id } });
  revalidatePath('/dashboard/blog');
  revalidatePath('/blog');
}
