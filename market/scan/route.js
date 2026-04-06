import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { platform, title, imei, price, city, url, seller } = await req.json()

const db = await getDB()

await db.query(
`INSERT INTO marketplace_listings
(platform,seller_name,listing_title,imei,price,city,listing_url)
VALUES($1,$2,$3,$4,$5,$6,$7)`,
[platform,seller,title,imei,price,city,url]
)

const stolen = await db.query(
"SELECT status FROM device_enrollments WHERE imei=$1",
[imei]
)

if(stolen.rows.length && stolen.rows[0].status==="STOLEN"){

await db.query(
`INSERT INTO stolen_device_listings
(imei,platform,seller,price,city,listing_url)
VALUES($1,$2,$3,$4,$5,$6)`,
[imei,platform,seller,price,city,url]
)

}

await db.end()

return NextResponse.json({success:true})

}
