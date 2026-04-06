import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { imei } = await req.json()

const db = await getDB()

const path = await db.query(`
SELECT latitude, longitude, created_at
FROM intelligence_logs
WHERE imei=$1
ORDER BY created_at ASC
`,[imei])

await db.end()

return NextResponse.json(path.rows)

}
