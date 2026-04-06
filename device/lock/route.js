import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const { imei } = await req.json()

const db = await getDB()

await db.query(
`INSERT INTO device_commands
(imei,command)
VALUES ($1,'LOCK_DEVICE')`,
[imei]
)

await db.end()

return NextResponse.json({
success:true,
message:"Lock command queued"
})

}
