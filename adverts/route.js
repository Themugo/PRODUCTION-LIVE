import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){

const db = await getDB()

const ads = await db.query(
"SELECT * FROM adverts ORDER BY created_at DESC LIMIT 10"
)

await db.end()

return NextResponse.json(ads.rows)

}
