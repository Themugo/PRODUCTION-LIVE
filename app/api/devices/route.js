import { prisma } from '@/lib/db';

export async function GET(req) {
  const devices = await prisma.device.findMany({ include: { sims: true } });
  return new Response(JSON.stringify(devices), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const newDevice = await prisma.device.create({ data });
  return new Response(JSON.stringify(newDevice), { status: 201 });
}
