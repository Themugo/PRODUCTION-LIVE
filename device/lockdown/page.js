"use client"

export default function Lockdown(){

async function lockDevice(){

await fetch("/api/device/lock",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({imei:"356789123456789"})
})

alert("Device locked")

}

async function alarm(){

await fetch("/api/device/alarm",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({imei:"356789123456789"})
})

}

return(

<div>

<h1>SIMTRACE Device Lockdown</h1>

<button onClick={lockDevice}>
Lock Device
</button>

<button onClick={alarm}>
Trigger Alarm
</button>

</div>

)

}
