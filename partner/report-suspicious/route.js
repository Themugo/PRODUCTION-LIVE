import { verifyPartner } from "@/lib/partnerAuth"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { api_key, imei, reason, city, country } = await req.json()

const partner = await verifyPartner(api_key)

const db = await getDB()

await db.query(
`INSERT INTO intelligence_logs
(imei,event_type,source,country,city,confidence)
VALUES($1,'SUSPICIOUS_DEVICE','partner',$2,$3,60)`,
[imei,country,city]
)

await db.end()

return NextResponse.json({success:true})

}
