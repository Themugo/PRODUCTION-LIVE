import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { requireRole } from "@/lib/requireRole"

export async function POST(req){

const { token,imei } = await req.json()

const user = await requireRole(token,[
"repairer","seller","reseller"
])

const db = await getDB()

const device = await db.query(
"SELECT status FROM devices WHERE imei=$1",
[imei]
)

let result = "CLEAR"

if(device.rows.length){

if(device.rows[0].status === "STOLEN"){
 result = "STOLEN"
}

}

await db.query(
`INSERT INTO device_checks
(imei,checked_by,result)
VALUES($1,$2,$3)`,
[imei,user.id,result]
)

await db.end()

return NextResponse.json({
imei,
result
})

}
