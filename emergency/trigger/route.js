import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const { user_id, imei, latitude, longitude } = await req.json()

const db = await getDB()

const event = await db.query(
`INSERT INTO emergency_events
(user_id, imei, latitude, longitude, triggered_by)
VALUES ($1,$2,$3,$4,'panic_button')
RETURNING *`,
[user_id, imei, latitude, longitude]
)

await db.query(
`INSERT INTO emergency_logs
(event_id, action, details)
VALUES ($1,'EMERGENCY_TRIGGERED','Panic button activated')`,
[event.rows[0].id]
)

await db.end()

return NextResponse.json({
success:true,
event:event.rows[0]
})

}
