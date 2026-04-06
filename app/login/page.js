'use client'

import { useState } from "react"

export default function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = async () => {
    const res = await fetch("/api/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({email,password})
    })

    const data = await res.json()

    if(data.success){
      window.location="/dashboard"
    } else {
      alert("Login failed")
    }
  }

  return (
    <div>
      <h2>SIMTRACE Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  )
}
