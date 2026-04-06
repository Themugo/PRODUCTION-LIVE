"use client"

import { useEffect,useState } from "react"
import dynamic from "next/dynamic"

const Map = dynamic(
()=>import("../../components/LiveMap"),
{ ssr:false }
)

export default function LiveViewer({params}){

const [points,setPoints] = useState([])

useEffect(()=>{

const interval = setInterval(async()=>{

const res = await fetch(`/api/live/session/${params.token}`)
const data = await res.json()

setPoints(data)

},5000)

return ()=>clearInterval(interval)

},[])

return(

<div>

<h1>Live Safety Tracking</h1>

<Map points={points} />

</div>

)

}
