import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { user_id } = await req.json()

const db = await getDB()

const sub = await db.query(
"SELECT * FROM subscriptions WHERE user_id=$1",
[user_id]
)

const devices = await db.query(
"SELECT COUNT(*) FROM devices WHERE owner_id=$1",
[user_id]
)

const limit = sub.rows[0]?.device_limit || 1

await db.end()

return NextResponse.json({
plan: sub.rows[0]?.plan || "FREE",
device_limit: limit,
devices_used: devices.rows[0].count
})

}
