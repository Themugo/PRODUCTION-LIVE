import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){

const db = await getDB()

// detect hotspots
const hotspots = await db.query(`
SELECT city, COUNT(*) as detections
FROM intelligence_logs
GROUP BY city
ORDER BY detections DESC
LIMIT 10
`)

// detect frequently seen stolen devices
const stolenClusters = await db.query(`
SELECT imei, COUNT(*) as sightings
FROM intelligence_logs
GROUP BY imei
HAVING COUNT(*) > 5
ORDER BY sightings DESC
`)

await db.end()

return NextResponse.json({
hotspots: hotspots.rows,
clusters: stolenClusters.rows
})

}
