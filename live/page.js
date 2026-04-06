"use client"

import { useState } from "react"

export default function LiveTracking(){

const [link,setLink] = useState("")

async function start(){

const res = await fetch("/api/live/start",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
user_id:1,
imei:"356789123456789",
duration_minutes:120
})
})

const data = await res.json()

setLink(window.location.origin + data.share_url)

}

return(

<div>

<h1>🛰 Live Safety Tracking</h1>

<button onClick={start}>
Start 2 Hour Safety Tracking
</button>

{link && (
<div>

<p>Share this link with trusted contacts:</p>

<input
value={link}
readOnly
style={{width:"100%"}}
/>

</div>
)}

</div>

)

}
