"use client"

import { useEffect,useState } from "react"

export default function FederationDashboard(){

const [events,setEvents] = useState([])

useEffect(()=>{

fetch("/api/federation/events")
.then(r=>r.json())
.then(data=>setEvents(data))

},[])

return(

<div>

<h2>Global Federation Intelligence</h2>

<table>

<tr>
<th>IMEI</th>
<th>Event</th>
<th>Country</th>
<th>City</th>
</tr>

{events.map(e=>(
<tr key={e.id}>
<td>{e.imei}</td>
<td>{e.event_type}</td>
<td>{e.country}</td>
<td>{e.city}</td>
</tr>
))}

</table>

</div>

)

}
