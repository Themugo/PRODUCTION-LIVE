import { prisma } from '@/lib/db';

export async function GET(req) {
  const sims = await prisma.sIM.findMany({ include: { device: true } });
  return new Response(JSON.stringify(sims), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const newSim = await prisma.sIM.create({ data });
  return new Response(JSON.stringify(newSim), { status: 201 });
}
