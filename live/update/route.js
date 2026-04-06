import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const { token, latitude, longitude, battery } = await req.json()

const db = await getDB()

const session = await db.query(
"SELECT id FROM live_tracking_sessions WHERE share_token=$1 AND status='ACTIVE'",
[token]
)

if(!session.rows.length){

await db.end()
return NextResponse.json({error:"invalid session"})

}

await db.query(
`INSERT INTO live_tracking_locations
(session_id, latitude, longitude, battery)
VALUES ($1,$2,$3,$4)`,
[session.rows[0].id, latitude, longitude, battery]
)

await db.end()

return NextResponse.json({success:true})

}
