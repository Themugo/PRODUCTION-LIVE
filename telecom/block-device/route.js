import { verifyTelecom } from "@/lib/telecomAuth"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { api_key, imei } = await req.json()

await verifyTelecom(api_key)

const db = await getDB()

await db.query(
`INSERT INTO telecom_blacklist_sync
(imei,status,synced_with)
VALUES($1,'BLOCK','telecom')`,
[imei]
)

await db.end()

return NextResponse.json({
imei,
action:"BLOCK_DEVICE"
})

}
