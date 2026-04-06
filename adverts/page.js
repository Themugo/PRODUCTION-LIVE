"use client"

import { useEffect,useState } from "react"

export default function Adverts(){

const [ads,setAds] = useState([])

useEffect(()=>{

fetch("/api/adverts")
.then(r=>r.json())
.then(data=>setAds(data))

},[])

return(

<div>

<h1>Sponsored Services</h1>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>

{ads.map(ad=>(
<div key={ad.id} style={{border:"1px solid #ccc",padding:10}}>

<img src={ad.image} width="100%"/>

<h3>{ad.title}</h3>

<p>{ad.country}</p>

</div>
))}

</div>

</div>

)

}
