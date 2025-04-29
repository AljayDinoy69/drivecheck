// app/api/vehicle-entry/exit/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const updated = await prisma.vehicleEntry.update({
      where: { id },
      data: { exitTime: new Date() },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update exit time' }, { status: 500 });
  }
}
