import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(){

const db = await getDB()

const devices = await db.query("SELECT COUNT(*) FROM devices")
const detections = await db.query("SELECT COUNT(*) FROM detections")
const threats = await db.query("SELECT COUNT(*) FROM threat_alerts")

await db.end()

return NextResponse.json({
devices: devices.rows[0].count,
detections: detections.rows[0].count,
threats: threats.rows[0].count
})

}
