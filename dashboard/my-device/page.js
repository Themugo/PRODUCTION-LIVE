'use client'

import { useState } from "react"

export default function MyDevice(){

const [imei,setImei] = useState("")

const reportStolen = async ()=>{

```
await fetch("/api/report-stolen",{
  method:"POST",
  headers:{ "Content-Type":"application/json"},
  body:JSON.stringify({imei})
})

alert("Device marked as stolen")
```

}

return(

```
<div>

  <h2>My Device</h2>

  <input
    placeholder="Enter IMEI"
    value={imei}
    onChange={e=>setImei(e.target.value)}
  />

  <button onClick={reportStolen}>
    Report Stolen
  </button>

</div>
```
  // app/dashboard/my-device/page.js
<h3>Guardian Contacts</h3>
<input placeholder="Email guardian 1"/>
<input placeholder="Email guardian 2"/>
<input placeholder="Email guardian 3"/>

)

}
