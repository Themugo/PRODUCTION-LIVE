"use client";

import { useState } from "react";

export default function RegisterDevice() {
  const [imei, setImei] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    alert(`Device Registered: ${name} (${imei})`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Register Device</h1>

      <div className="card" style={{ maxWidth: "400px" }}>
        <input
          placeholder="Device Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          placeholder="IMEI Number"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button onClick={handleSubmit}>
          Register Device
        </button>
      </div>
    </div>
if(devices_used >= device_limit){

return {
success:false,
error:"Device limit reached. Upgrade plan."
}

}
  );
}
