import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const { user_id, imei } = await req.json()

const db = await getDB()

const event = await db.query(
`INSERT INTO emergency_events
(user_id, imei, triggered_by)
VALUES ($1,$2,'silent_trigger')
RETURNING *`,
[user_id, imei]
)

await db.end()

return NextResponse.json({success:true})
await db.query(
"UPDATE device_enrollments SET status='EMERGENCY' WHERE imei=$1",
[imei]
)
}
