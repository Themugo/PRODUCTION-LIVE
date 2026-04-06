import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

  const { imei } = await req.json()

  const db = await getDB()

  const device = await db.query(
    "SELECT * FROM devices WHERE imei=$1",
    [imei]
  )

  if(!device.rows.length){
    return NextResponse.json({error:"device not found"})
  }

  let score = 0
  let reasons = []

  const device_id = device.rows[0].id

  // Check stolen status
  if(device.rows[0].status === "STOLEN"){
    score += 40
    reasons.push("reported stolen")
  }

  // Check emergency mode
  if(device.rows[0].emergency_mode){
    score += 30
    reasons.push("emergency mode active")
  }

  // SIM swaps
  const simCount = await db.query(
    "SELECT COUNT(*) FROM sim_cards WHERE device_id=$1",
    [device_id]
  )

  if(simCount.rows[0].count > 3){
    score += 20
    reasons.push("multiple SIM swaps")
  }

  // Detection density
  const detections = await db.query(
    "SELECT COUNT(*) FROM detections WHERE device_id=$1",
    [device_id]
  )

  if(detections.rows[0].count > 10){
    score += 10
    reasons.push("high detection frequency")
  }

  // Determine risk level
  let level = "LOW"

  if(score > 80) level = "CRITICAL"
  else if(score > 60) level = "HIGH"
  else if(score > 30) level = "MEDIUM"

  await db.query(
    `INSERT INTO risk_scores(device_id,imei,risk_score,risk_level,reasons)
     VALUES($1,$2,$3,$4,$5)`,
    [device_id,imei,score,level,reasons.join(", ")]
  )

  await db.end()

  return NextResponse.json({
    imei,
    risk_score:score,
    risk_level:level,
    reasons
  })

}
