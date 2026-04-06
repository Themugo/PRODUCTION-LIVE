
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req){
  const { device_id, lat, lng } = await req.json();

  await prisma.device.update({
    where:{ id: device_id },
    data:{ lat, lng }
  });

  return Response.json({ ok:true });
}
