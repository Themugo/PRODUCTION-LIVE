import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(req,{params}){

const { imei } = params

const db = await getDB()

const device = await db.query(
"SELECT id FROM devices WHERE imei=$1",
[imei]
)

if(device.rows.length === 0){
return NextResponse.json({movements:[]})
}

const device_id = device.rows[0].id

const res = await db.query(
`SELECT latitude,longitude,detected_at
     FROM detections
     WHERE device_id=$1
     ORDER BY detected_at ASC`,
[device_id]
)

await db.end()

return NextResponse.json({
movements: res.rows
})

}
