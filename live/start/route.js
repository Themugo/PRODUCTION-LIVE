import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { randomUUID } from "crypto"

export async function POST(req){

const { user_id, imei, duration_minutes } = await req.json()

const db = await getDB()

const token = randomUUID()

const expires = new Date(
Date.now() + duration_minutes * 60000
)

const session = await db.query(
`INSERT INTO live_tracking_sessions
(user_id, imei, share_token, expires_at)
VALUES ($1,$2,$3,$4)
RETURNING *`,
[user_id, imei, token, expires]
)

await db.end()

return NextResponse.json({
success:true,
share_url:`/live/${token}`
})

}
