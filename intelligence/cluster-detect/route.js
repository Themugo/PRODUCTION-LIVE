import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){

const db = await getDB()

const clusters = await db.query(`
SELECT
ROUND(latitude::numeric,2) as lat,
ROUND(longitude::numeric,2) as lon,
COUNT(*) as devices
FROM market_sightings
GROUP BY lat,lon
HAVING COUNT(*) > 3
`)

for(const c of clusters.rows){

const cluster_id = `${c.lat}_${c.lon}`

await db.query(
`INSERT INTO device_clusters
(cluster_id,latitude,longitude,device_count,risk_score)
VALUES($1,$2,$3,$4,$5)`,
[
cluster_id,
c.lat,
c.lon,
c.devices,
Math.min(100,c.devices*10)
]
)

}

await db.end()

return NextResponse.json(clusters.rows)

}
