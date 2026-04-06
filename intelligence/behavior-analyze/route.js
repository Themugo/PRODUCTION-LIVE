import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { device_id } = await req.json()

const db = await getDB()

const profile = await db.query(
"SELECT * FROM behavioral_profiles WHERE device_id=$1",
[device_id]
)

const events = await db.query(
`SELECT * FROM behavioral_events
 WHERE device_id=$1
 ORDER BY created_at DESC
 LIMIT 10`,
[device_id]
)

let anomalyScore = 0
let reasons = []

const p = profile.rows[0]

for(const e of events.rows){

// location anomaly
if(p.usual_country && e.country !== p.usual_country){

anomalyScore += 40
reasons.push("unexpected country movement")

}

// unusual time activity
if(e.hour_of_day < p.active_start_hour || e.hour_of_day > p.active_end_hour){

anomalyScore += 20
reasons.push("unusual activity time")

}

}

if(anomalyScore > 50){

await db.query(
`INSERT INTO threat_alerts
(device_id,threat_type,threat_score,description)
VALUES($1,'BEHAVIOR_ANOMALY',$2,$3)`,
[
device_id,
anomalyScore,
reasons.join(", ")
]
)

}

await db.end()

return NextResponse.json({
anomalyScore,
reasons
})

}
