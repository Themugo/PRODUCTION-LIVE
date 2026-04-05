import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(req) {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req) {
  const { email, name, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  return new Response(JSON.stringify(newUser), { status: 201 });
}
