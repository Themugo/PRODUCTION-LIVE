import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req){

const user_id = 1 // replace later with auth session

const db = await getDB()

const devices = await db.query(
`SELECT * FROM device_enrollments
WHERE owner_id=$1
ORDER BY created_at DESC`,
[user_id]
)

await db.end()

return NextResponse.json(devices.rows)

}
