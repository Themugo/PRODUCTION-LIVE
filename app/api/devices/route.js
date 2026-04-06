import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const devices = await prisma.device.findMany();
    return Response.json(devices);
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const device = await prisma.device.create({
      data: {
        imei: body.imei,
        name: body.name || "Unnamed"
      }
    });
    return Response.json(device);
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
