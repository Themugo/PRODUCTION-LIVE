import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){

const db = await getDB()

const listings = await db.query(
`SELECT * FROM stolen_device_listings
ORDER BY detected_at DESC`
)

await db.end()

return NextResponse.json(listings.rows)

}
