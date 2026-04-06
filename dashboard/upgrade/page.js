"use client"

import { useState,useEffect } from "react"

export default function Upgrade(){

const [plans,setPlans] = useState([])

useEffect(()=>{

fetch("/api/plans")
.then(r=>r.json())
.then(data=>setPlans(data))

},[])

return(

<div style={{maxWidth:700,margin:"auto"}}>

<h1>Upgrade Protection Plan</h1>

{plans.map(p=>(

<div key={p.id} style={{border:"1px solid #ccc",padding:10}}>

<h3>{p.name}</h3>

<p>Devices allowed: {p.device_limit}</p>

<p>Price: ${p.price}/year</p>

<button>Select Plan</button>

</div>

))}

</div>

)

}
