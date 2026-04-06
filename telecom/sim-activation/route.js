import { verifyTelecom } from "@/lib/telecomAuth"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { api_key, imei, sim_number, country, city, latitude, longitude } = await req.json()

const telecom = await verifyTelecom(api_key)

const db = await getDB()

await db.query(
`INSERT INTO telecom_activations
(imei,sim_number,carrier,country,city,latitude,longitude)
VALUES($1,$2,$3,$4,$5,$6,$7)`,
[
imei,
sim_number,
telecom.name,
country,
city,
latitude,
longitude
]
)

const device = await db.query(
"SELECT status FROM devices WHERE imei=$1",
[imei]
)

if(device.rows.length && device.rows[0].status === "STOLEN"){

await db.query(
`INSERT INTO threat_alerts
(device_id,imei,threat_type,threat_score,description,latitude,longitude)
VALUES(
(SELECT id FROM devices WHERE imei=$1),
$1,
'TELECOM_ACTIVATION',
95,
'Stolen phone activated on telecom network',
$2,$3
)`,
[imei,latitude,longitude]
)

}

await db.end()

return NextResponse.json({success:true})

}
