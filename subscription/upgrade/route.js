import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

const plans = {
FREE: {limit:1},
PRO: {limit:3},
PREMIUM: {limit:10},
ENTERPRISE: {limit:50}
}

export async function POST(req){

const { user_id, plan } = await req.json()

const db = await getDB()

await db.query(
`UPDATE subscriptions
 SET plan=$1,
 device_limit=$2
 WHERE user_id=$3`,
[
plan,
plans[plan].limit,
user_id
]
)

await db.end()

return NextResponse.json({
success:true,
plan
})

}
