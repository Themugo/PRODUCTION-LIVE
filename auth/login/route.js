import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { verifyPassword,generateToken } from "@/lib/auth"

export async function POST(req){

const { email,password } = await req.json()

const db = await getDB()

const user = await db.query(
"SELECT * FROM users WHERE email=$1",
[email]
)

if(!user.rows.length){
 return NextResponse.json({error:"user not found"})
}

const u = user.rows[0]

const valid = await verifyPassword(password,u.password)

if(!valid){
 return NextResponse.json({error:"invalid credentials"})
}

const token = generateToken()

await db.query(
`INSERT INTO sessions(user_id,token,expires_at)
VALUES($1,$2,NOW() + INTERVAL '7 days')`,
[u.id,token]
)

await db.end()

return NextResponse.json({
success:true,
token,
role:u.role
})

}
