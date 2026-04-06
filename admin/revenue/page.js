"use client"

import { useEffect,useState } from "react"

export default function RevenueDashboard(){

const [payments,setPayments] = useState([])

useEffect(()=>{

fetch("/api/admin/payments")
.then(res=>res.json())
.then(data=>setPayments(data))

},[])

return(

<div>

<h2>SIMTRACE Revenue</h2>

<table>

<tr>
<th>User</th>
<th>Amount</th>
<th>Status</th>
<th>Date</th>
</tr>

{payments.map(p=>(
<tr key={p.id}>
<td>{p.user_id}</td>
<td>{p.amount}</td>
<td>{p.status}</td>
<td>{p.created_at}</td>
</tr>
))}

</table>

</div>

)

}
