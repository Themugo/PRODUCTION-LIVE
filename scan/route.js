{
 "imei":"356789123456789",
 "sim_iccid":"8992101234567890000",
 "model":"Samsung S22",
 "brand":"Samsung",
 "os":"Android 14",
 "hardware_id":"ABC123XYZ",
 "wifi_hash":"wifi_signature"
}
import { generateFingerprint } from "@/lib/fingerprint"
import { getDB } from "@/lib/db"

export async function POST(req){

const body = await req.json()

const fingerprint = generateFingerprint(body)

const db = await getDB()

// find device by IMEI
let device = await db.query(
"SELECT * FROM devices WHERE imei=$1",
[body.imei]
)

let device_id

if(device.rows.length){

device_id = device.rows[0].id

}else{

// Shadow detection if IMEI changed
const shadow = await db.query(
"SELECT * FROM device_fingerprint WHERE fingerprint_hash=$1",
[fingerprint]
)

if(shadow.rows.length){

device_id = shadow.rows[0].device_id

console.log("Shadow match found")

}else{

const newDevice = await db.query(
`INSERT INTO devices(imei,status)
 VALUES($1,'ACTIVE')
 RETURNING id`,
[body.imei]
)

device_id = newDevice.rows[0].id

}

}

// store fingerprint
await db.query(
`INSERT INTO device_fingerprint
(device_id,imei,sim_iccid,model,brand,os,hardware_id,wifi_hash,fingerprint_hash)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
[
device_id,
body.imei,
body.sim_iccid,
body.model,
body.brand,
body.os,
body.hardware_id,
body.wifi_hash,
fingerprint
]
)

await db.end()

return Response.json({
success:true,
shadow_fingerprint:fingerprint
})

}
const previous = await db.query(
`SELECT sim_iccid FROM device_fingerprint
 WHERE device_id=$1
 ORDER BY created_at DESC
 LIMIT 1`,
[device_id]
)

if(previous.rows.length){

if(previous.rows[0].sim_iccid !== body.sim_iccid){

await db.query(
`INSERT INTO sim_swap_events(device_id,old_sim,new_sim)
 VALUES($1,$2,$3)`,
[device_id,previous.rows[0].sim_iccid,body.sim_iccid]

 if(device.status === "STOLEN"){

await db.query(
`INSERT INTO market_sightings
(device_id,imei,source,country,city,latitude,longitude,confidence)
VALUES($1,$2,'passive_network',$3,$4,$5,$6,85)`,
[
device_id,
body.imei,
body.country,
body.city,
body.latitude,
body.longitude
]
)

await db.query(
`INSERT INTO blackmarket_alerts
(device_id,imei,alert_type,description,risk_score)
VALUES($1,$2,'STOLEN_DEVICE_MARKET_ACTIVITY','Stolen device detected in network',90)`,
[device_id,body.imei]
)

}
)

}

}
