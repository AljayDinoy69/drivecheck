import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const entry = await req.json(); // This line causes the issue during static generation
    const newEntry = await prisma.vehicleEntry.create({
      data: entry,
    });
    return NextResponse.json(newEntry, { status: 200 });
  } catch (error) {
    console.error('Failed to add entry:', error);
    return NextResponse.json({ error: 'Failed to add entry' }, { status: 500 });
  }
}