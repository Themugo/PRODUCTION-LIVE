"use client";
import { useState, useContext } from "react";
import { DeviceContext } from "../../components/DeviceContext";
import { exportToCSV } from "../../utils/exportCSV";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function DevicesPage() {
  const { devices, setDevices } = useContext(DeviceContext);
  const [name, setName] = useState("");
  const [sim, setSim] = useState("");
  const [status, setStatus] = useState("active");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const addDevice = () => {
    if (!name || !sim) return alert("Fill all fields");
    const newDevice = { id: Date.now(), name, sim, status, lat: -1.292 + Math.random()*0.01, lng: 36.821 + Math.random()*0.01 };
    const updated = [...devices, newDevice];
    setDevices(updated);
    socket.emit("add-device", newDevice);
    setName(""); setSim(""); setStatus("active");
  };

  const removeDevice = id => {
    if (!confirm("Remove device?")) return;
    const updated = devices.filter(d => d.id !== id);
    setDevices(updated);
    socket.emit("remove-device", id);
  };

  const filtered = devices.filter(d => {
    const matches = d.name.toLowerCase().includes(search.toLowerCase()) || d.sim.includes(search);
    const statusMatch = filterStatus === "all" ? true : d.status === filterStatus;
    return matches && statusMatch;
  });

  return (
    <div style={{ padding:"20px", maxWidth:"700px", margin:"0 auto" }}>
      <h1>Device Registration</h1>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={inputStyle}/>
      <input placeholder="SIM" value={sim} onChange={e=>setSim(e.target.value)} style={inputStyle}/>
      <select value={status} onChange={e=>setStatus(e.target.value)} style={inputStyle}><option>active</option><option>inactive</option></select>
      <button onClick={addDevice} style={{...inputStyle, backgroundColor:"#0070f3", color:"#fff"}}>Add Device</button>

      <h2>Search & Filter</h2>
      <input placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} style={inputStyle}/>
      <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={inputStyle}><option>all</option><option>active</option><option>inactive</option></select>

      <button onClick={()=>exportToCSV(devices)} style={{...inputStyle, backgroundColor:"#28a745", color:"#fff"}}>Export CSV</button>

      <h2>Registered Devices</h2>
      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead><tr><th style={th}>Name</th><th style={th}>SIM</th><th style={th}>Status</th><th style={th}>Actions</th></tr></thead>
        <tbody>{filtered.map(d=><tr key={d.id}><td style={td}>{d.name}</td><td style={td}>{d.sim}</td><td style={td}>{d.status}</td><td style={td}><button onClick={()=>removeDevice(d.id)} style={removeBtn}>Remove</button></td></tr>)}</tbody>
      </table>
    </div>
  );
}

const inputStyle={width:"100%",padding:"10px",margin:"5px 0",borderRadius:"5px",border:"1px solid #ccc"};
const th={border:"1px solid #ccc",padding:"8px",background:"#f0f0f0"};
const td={border:"1px solid #ccc",padding:"8px",textAlign:"center"};
const removeBtn={padding:"5px 10px",backgroundColor:"#ff4d4f",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer"};
