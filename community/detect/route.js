import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){
  const { detector_imei, detected_imei, latitude, longitude } = await req.json()
  const db = await getDB()

  // log detection
  await db.query(
    `INSERT INTO community_detection_events
     (detector_imei, detected_imei, latitude, longitude)
     VALUES ($1,$2,$3,$4)`,
    [detector_imei, detected_imei, latitude, longitude]
  )

  // check if detected device is stolen
  const stolen = await db.query(
    `SELECT * FROM device_enrollments WHERE imei=$1 AND status='STOLEN'`,
    [detected_imei]
  )

  if(stolen.rows.length){
    // trigger alert to owner + police + trusted contacts
    console.log(`Device ${detected_imei} detected stolen by ${detector_imei}`)
  }

  await db.end()
  return NextResponse.json({success:true})
}
