import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const { imei, type, file_url } = await req.json()

const db = await getDB()

await db.query(
`INSERT INTO device_evidence
(imei,evidence_type,file_url)
VALUES ($1,$2,$3)`,
[imei,type,file_url]
)

await db.end()

return NextResponse.json({success:true})

}
