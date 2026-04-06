"use client"

import { useState } from "react"

export default function TrustedContacts(){

const [contact1,setContact1] = useState("")
const [contact2,setContact2] = useState("")

const saveContacts = async ()=>{

await fetch("/api/user/trusted",{
method:"POST",
body:JSON.stringify({
contact1,
contact2
})
})

alert("Trusted contacts saved")

}

return(

<div style={{maxWidth:600,margin:"auto"}}>

<h1>Trusted Contacts</h1>

<p>
These contacts can report your device stolen
if you cannot access your account.
</p>

<input
placeholder="Trusted Contact 1"
value={contact1}
onChange={e=>setContact1(e.target.value)}
/>

<br/><br/>

<input
placeholder="Trusted Contact 2"
value={contact2}
onChange={e=>setContact2(e.target.value)}
/>

<br/><br/>

<button onClick={saveContacts}>
Save Contacts
</button>

</div>

)

}
