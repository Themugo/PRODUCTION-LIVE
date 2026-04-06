import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(){

const db = await getDB()

const res = await db.query(`     SELECT
      latitude,
      longitude
    FROM detections
    WHERE detected_at > NOW() - INTERVAL '7 days'
  `)

await db.end()

return NextResponse.json({
points: res.rows
})

}
