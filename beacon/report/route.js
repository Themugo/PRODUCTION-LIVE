import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { beacon_id, latitude, longitude, source } = await req.json()

const db = await getDB()

const device = await db.query(
"SELECT imei FROM devices WHERE beacon_id=$1",
[beacon_id]
)

if(!device.rows.length){
 await db.end()
 return NextResponse.json({message:"Unknown beacon"})
}

const imei = device.rows[0].imei

await db.query(
`INSERT INTO beacon_sightings
(imei,detected_by,latitude,longitude,detection_source)
VALUES($1,$2,$3,$4,$5)`,
[
imei,
source,
latitude,
longitude,
source
]
)

await db.end()

return NextResponse.json({success:true})

}
