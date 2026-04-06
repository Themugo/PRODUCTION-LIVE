import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){

const db = await getDB()

const events = await db.query(
`SELECT * FROM beacon_sightings
ORDER BY created_at DESC
LIMIT 100`
)

await db.end()

return NextResponse.json(events.rows)

}
