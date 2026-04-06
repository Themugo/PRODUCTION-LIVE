import { verifyPartner } from "@/lib/federationAuth"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { api_key, imei } = await req.json()

await verifyPartner(api_key)

const db = await getDB()

const result = await db.query(
"SELECT * FROM global_blacklist WHERE imei=$1",
[imei]
)

await db.end()

return NextResponse.json({
imei,
blacklisted: result.rows.length > 0,
details: result.rows[0] || null
})

}
