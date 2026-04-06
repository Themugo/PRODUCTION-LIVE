import { verifyTelecom } from "@/lib/telecomAuth"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { api_key, imei } = await req.json()

await verifyTelecom(api_key)

const db = await getDB()

const device = await db.query(
"SELECT status FROM devices WHERE imei=$1",
[imei]
)

const blacklist = await db.query(
"SELECT * FROM global_blacklist WHERE imei=$1",
[imei]
)

await db.end()

return NextResponse.json({
imei,
stolen: device.rows[0]?.status === "STOLEN",
blacklisted: blacklist.rows.length > 0
})

}
