"use client"

import { useEffect,useState } from "react"

export default function MarketMonitor(){

const [listings,setListings] = useState([])

useEffect(()=>{

fetch("/api/market/listings")
.then(r=>r.json())
.then(setListings)

},[])

return(

<div>

<h1>Black Market Monitor</h1>

<table border="1">

<tr>
<th>Platform</th>
<th>IMEI</th>
<th>City</th>
<th>Price</th>
<th>Link</th>
</tr>

{listings.map(l=>(
<tr key={l.id}>
<td>{l.platform}</td>
<td>{l.imei}</td>
<td>{l.city}</td>
<td>${l.price}</td>
<td><a href={l.listing_url}>View</a></td>
</tr>
))}

</table>

</div>

)

}
