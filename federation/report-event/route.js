import { NextResponse } from "next/server"
import { verifyPartner } from "@/lib/federationAuth"
import { getDB } from "@/lib/db"

export async function POST(req){

const { api_key, imei, event_type, country, city, latitude, longitude } = await req.json()

const partner = await verifyPartner(api_key)

const db = await getDB()

await db.query(
`INSERT INTO federation_events
(imei,event_type,country,city,latitude,longitude,source_partner,confidence)
VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
[
imei,
event_type,
country,
city,
latitude,
longitude,
partner.id,
80
]
)

await db.end()

return NextResponse.json({success:true})

}
