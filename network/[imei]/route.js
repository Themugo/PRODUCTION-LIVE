import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(req,{params}){

const {imei} = params

const db = await getDB()

const device = await db.query(
"SELECT id FROM devices WHERE imei=$1",
[imei]
)

if(device.rows.length === 0){
return NextResponse.json({nodes:[],links:[]})
}

const device_id = device.rows[0].id

const res = await db.query(`     SELECT sim,device_id
    FROM sim_device_history
    WHERE device_id=$1
  `,[device_id])

let nodes = []
let links = []

nodes.push({
id: imei,
type:"device"
})

res.rows.forEach(r=>{

```
nodes.push({
  id:r.sim,
  type:"sim"
})

links.push({
  source:imei,
  target:r.sim
})
```

})

await db.end()

return NextResponse.json({
nodes,
links
})

}
