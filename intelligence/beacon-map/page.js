"use client"

import { useEffect,useState } from "react"

export default function BeaconMap(){

const [data,setData] = useState([])

useEffect(()=>{

fetch("/api/beacon/events")
.then(r=>r.json())
.then(setData)

},[])

return(

<div>

<h2>SIMTRACE Beacon Detection Map</h2>

<table border="1">

<tr>
<th>IMEI</th>
<th>Latitude</th>
<th>Longitude</th>
<th>Source</th>
</tr>

{data.map(e=>(
<tr key={e.id}>
<td>{e.imei}</td>
<td>{e.latitude}</td>
<td>{e.longitude}</td>
<td>{e.detection_source}</td>
</tr>
))}

</table>

</div>

)

}
