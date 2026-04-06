"use client"

import { useEffect,useState } from "react"

export default function PartnerDashboard(){

const [scans,setScans] = useState([])

useEffect(()=>{

fetch("/api/partner/scans")
.then(r=>r.json())
.then(setScans)

},[])

return(

<div>

<h1>Partner Detection Dashboard</h1>

<table border="1">

<tr>
<th>IMEI</th>
<th>Result</th>
<th>City</th>
<th>Date</th>
</tr>

{scans.map(s=>(
<tr key={s.id}>
<td>{s.imei}</td>
<td>{s.scan_result}</td>
<td>{s.city}</td>
<td>{s.created_at}</td>
</tr>
))}

</table>

</div>

)

}
