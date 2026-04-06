import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(){

const db = await getDB()

const res = await db.query(`     SELECT imei,threat_type,created_at
    FROM threat_alerts
    ORDER BY created_at DESC
    LIMIT 20
  `)

await db.end()

return NextResponse.json({
alerts: res.rows
})

}
