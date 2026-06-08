import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const sliders = await prisma.slider.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(sliders);
  } catch (error) {
    return NextResponse.json([]);
  }
}
