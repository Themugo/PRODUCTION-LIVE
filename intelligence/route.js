import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET() {

  try {

    const db = await getDB()

    const result = await db.query(`
      SELECT
        d.imei,
        det.latitude,
        det.longitude,
        det.detected_at
      FROM detections det
      JOIN devices d
      ON det.device_id = d.id
      ORDER BY det.detected_at DESC
      LIMIT 100
    `)

    await db.end()

    return NextResponse.json({
      detections: result.rows
    })

  } catch (error) {

    return NextResponse.json(
      { error: "intelligence feed failed" },
      { status: 500 }
    )

  }

}
