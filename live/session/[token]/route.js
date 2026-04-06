import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(req,{params}){

const db = await getDB()

const session = await db.query(
"SELECT id FROM live_tracking_sessions WHERE share_token=$1",
[params.token]
)

if(!session.rows.length){

await db.end()
return NextResponse.json({error:"session not found"})

}

const locations = await db.query(
`SELECT latitude,longitude,created_at
FROM live_tracking_locations
WHERE session_id=$1
ORDER BY created_at DESC
LIMIT 100`,
[session.rows[0].id]
)

await db.end()

return NextResponse.json(locations.rows)

}
