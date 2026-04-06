import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const body = await req.json()

const db = await getDB()

// Save passive detection
await db.query(
`INSERT INTO passive_detections
(scanner_device_id,detected_fingerprint,imei,latitude,longitude,accuracy,network_type)
VALUES($1,$2,$3,$4,$5,$6,$7)`,
[
body.scanner_device_id,
body.detected_fingerprint,
body.imei,
body.latitude,
body.longitude,
body.accuracy,
body.network_type
]
)

// Check if device is known
const device = await db.query(
`SELECT * FROM devices WHERE imei=$1`,
[body.imei]
)

if(device.rows.length){

const d = device.rows[0]

// log detection
await db.query(
`INSERT INTO detections(device_id,sim,latitude,longitude)
VALUES($1,$2,$3,$4)`,
[
d.id,
"passive",
body.latitude,
body.longitude
]
)

// trigger alerts if stolen
if(d.status === "STOLEN"){

await db.query(
`INSERT INTO threat_alerts
(device_id,imei,threat_type,threat_score,description,latitude,longitude)
VALUES($1,$2,'PASSIVE_STOLEN_DETECTION',95,'Stolen device detected by passive network',$3,$4)`,
[
d.id,
body.imei,
body.latitude,
body.longitude
]
)

}

}

await db.end()

return NextResponse.json({
success:true
})

}
