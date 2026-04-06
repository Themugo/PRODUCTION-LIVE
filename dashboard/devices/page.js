"use client"

import { useEffect,useState } from "react"

export default function DevicesDashboard(){

const [devices,setDevices] = useState([])

useEffect(()=>{

fetch("/api/user/devices")
.then(r=>r.json())
.then(data=>setDevices(data))

},[])

const reportStolen = async (imei)=>{

await fetch("/api/device/report-stolen",{
method:"POST",
body:JSON.stringify({imei})
})

alert("Device reported stolen")

}

return(

<div style={{maxWidth:900,margin:"auto"}}>

<h1>My Devices</h1>

<table border="1" cellPadding="10">

<tr>
<th>Device</th>
<th>IMEI</th>
<th>Status</th>
<th>Action</th>
</tr>

{devices.map(d=>(

<tr key={d.id}>

<td>{d.device_name || "Unnamed Device"}</td>

<td>{d.imei}</td>

<td>{d.status}</td>

<td>

<button onClick={()=>reportStolen(d.imei)}>
Report Stolen
</button>

</td>

</tr>

))}

</table>

</div>

)

}
