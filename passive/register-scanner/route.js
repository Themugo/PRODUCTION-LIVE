import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const body = await req.json()

const db = await getDB()

const scanner = await db.query(
`INSERT INTO devices
(imei,device_model,status)
VALUES($1,$2,'SCANNER')
RETURNING id`,
[
body.imei,
body.model
]
)

await db.end()

return NextResponse.json({
scanner_id:scanner.rows[0].id
})

}
