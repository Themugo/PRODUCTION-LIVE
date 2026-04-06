"use client"

import { useEffect,useState } from "react"

export default function CrimeDashboard(){

const [data,setData] = useState(null)

useEffect(()=>{

fetch("/api/intelligence/analyze")
.then(r=>r.json())
.then(setData)

},[])

if(!data) return <p>Loading intelligence...</p>

return(

<div>

<h1>SIMTRACE Crime Intelligence</h1>

<h2>Theft Hotspots</h2>

<table border="1">

<tr>
<th>City</th>
<th>Detections</th>
</tr>

{data.hotspots.map(h=>(
<tr key={h.city}>
<td>{h.city}</td>
<td>{h.detections}</td>
</tr>
))}

</table>

<h2>Stolen Device Clusters</h2>

<table border="1">

<tr>
<th>IMEI</th>
<th>Sightings</th>
</tr>

{data.clusters.map(c=>(
<tr key={c.imei}>
<td>{c.imei}</td>
<td>{c.sightings}</td>
</tr>
))}

</table>

</div>

)

}
