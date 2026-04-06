import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(req,{params}){

const db = await getDB()

const device = await db.query(
"SELECT status FROM device_enrollments WHERE imei=$1",
[params.imei]
)

if(!device.rows.length){
 return NextResponse.json({status:"UNKNOWN"})
}

const report = await db.query(
"SELECT * FROM police_reports WHERE imei=$1 LIMIT 1",
[params.imei]
)

await db.end()

return NextResponse.json({
status: device.rows[0].status,
police: report.rows[0] || null
})

}
