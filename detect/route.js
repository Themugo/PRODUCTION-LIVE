const device = await db.query(
"SELECT id,status FROM devices WHERE imei=$1",
[imei]
)

const device_id = device.rows[0].id
const status = device.rows[0].status

if(status === "STOLEN"){

await db.query(
`INSERT INTO threat_alerts
    (device_id,imei,threat_type,threat_score,description,latitude,longitude)
    VALUES($1,$2,'STOLEN_DEVICE_DETECTED',95,'Stolen device detected',$3,$4)`,
[device_id,imei,latitude,longitude]
)

}
