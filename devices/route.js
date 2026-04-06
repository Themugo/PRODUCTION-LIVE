import { NextResponse } from 'next/server'
import { Client } from '@neondatabase/serverless'

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

export async function GET(){

  try{

    await client.connect()

    const result = await client.query(
      "SELECT * FROM devices LIMIT 50"
    )

    await client.end()

    return NextResponse.json({
      data: result.rows
    })

  }catch(err){

    return NextResponse.json(
      { error:"database error" },
      { status:500 }
    )

  }

}
