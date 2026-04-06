import { NextResponse } from "next/server"
import { verifyPartner } from "@/lib/partnerAuth"
import { getDB } from "@/lib/db"

export async function POST(req){

const { api_key, imei, device_model, city, country } = await req.json()

const partner = await verifyPartner(api_key)

const db = await getDB()

const device = await db.query(
"SELECT status FROM device_enrollments WHERE imei=$1",
[imei]
)

let result = "SAFE"

if(device.rows.length && device.rows[0].status==="STOLEN"){
 result = "STOLEN"
}

await db.query(
`INSERT INTO partner_device_scans
(partner_id,imei,device_model,scan_result,city,country)
VALUES($1,$2,$3,$4,$5,$6)`,
[partner.id,imei,device_model,result,city,country]
)

await db.end()

return NextResponse.json({
imei,
result
})

}
