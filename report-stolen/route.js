import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const { imei } = await req.json()

const db = await getDB()

await db.query(
`UPDATE devices
     SET status='STOLEN'
     WHERE imei=$1`,
[imei]
)

await db.end()

return NextResponse.json({
success:true
})

}
