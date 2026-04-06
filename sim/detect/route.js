import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function POST(req){

const { imei, phone_number, owner_name, carrier, city, country } = await req.json()

const db = await getDB()

const existing = await db.query(
"SELECT phone_number FROM sim_identity WHERE imei=$1 ORDER BY last_seen DESC LIMIT 1",
[imei]
)

let swap = false

if(existing.rows.length && existing.rows[0].phone_number !== phone_number){
 swap = true
}

await db.query(
`INSERT INTO sim_identity
(imei, phone_number, owner_name, carrier, country)
VALUES ($1,$2,$3,$4,$5)`,
[imei, phone_number, owner_name, carrier, country]
)

if(swap){

await db.query(
`INSERT INTO sim_swap_events
(imei, old_number, new_number, carrier, city, country)
VALUES ($1,$2,$3,$4,$5,$6)`,
[
imei,
existing.rows[0].phone_number,
phone_number,
carrier,
city,
country
]
)

}

await db.end()

return NextResponse.json({
sim_swap_detected:swap
})

}
