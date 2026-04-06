"use client"

import { useState } from "react"

export default function EmergencyPage(){

const [status,setStatus] = useState("")

async function triggerEmergency(){

const res = await fetch("/api/emergency/trigger",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
user_id:1,
imei:"356789123456789",
latitude: -1.286389,
longitude: 36.817223
})
})

const data = await res.json()

setStatus("Emergency Activated")

}

return(

<div>

<h1>🚨 SIMTRACE Emergency Protection</h1>

<p>Press only in danger</p>

<button
onClick={triggerEmergency}
style={{
background:"red",
color:"white",
padding:"20px",
fontSize:"22px"
}}
>

PANIC BUTTON

</button>

<p>{status}</p>

</div>

)

}
