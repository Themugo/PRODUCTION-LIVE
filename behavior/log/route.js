import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const body = await req.json()

const db = await getDB()

await db.query(
`INSERT INTO behavioral_events
(device_id,latitude,longitude,speed,hour_of_day,sim_used)
VALUES($1,$2,$3,$4,$5,$6)`,
[
body.device_id,
body.latitude,
body.longitude,
body.speed,
body.hour,
body.sim
]
)

await db.end()

return NextResponse.json({success:true})

}
