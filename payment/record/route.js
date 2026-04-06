import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){

const { user_id, amount, provider, transaction_id } = await req.json()

const db = await getDB()

await db.query(
`INSERT INTO payments
(user_id,amount,provider,transaction_id,status)
VALUES($1,$2,$3,$4,'SUCCESS')`,
[user_id,amount,provider,transaction_id]
)

await db.end()

return NextResponse.json({success:true})

}
