import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req) {
  try {
    const imei = req.nextUrl.searchParams.get("imei");
    if (!imei) return NextResponse.json({ error: "IMEI required" }, { status: 400 });

    const db = await getDB();

    const deviceRes = await db.query(`SELECT id FROM devices WHERE imei=$1`, [imei]);
    const deviceId = deviceRes.rows[0]?.id;
    if (!deviceId) {
      await db.end();
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    const result = await db.query(
      `SELECT latitude, longitude, detected_at 
       FROM detections WHERE device_id=$1 ORDER BY detected_at ASC`,
      [deviceId]
    );

    await db.end();
    return NextResponse.json({ timeline: result.rows });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch timeline" }, { status: 500 });
  }
}
