// app/page.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [devices, setDevices] = useState([]);
  const [sims, setSims] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data from your API routes
  useEffect(() => {
    fetch("/api/devices")
      .then(res => res.json())
      .then(setDevices)
      .catch(console.error);

    fetch("/api/sims")
      .then(res => res.json())
      .then(setSims)
      .catch(console.error);

    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-simDark to-black text-white px-6 py-8">
      {/* Logo & Header */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/images/logo.png"
          alt="SimTrace Logo"
          width={150}
          height={150}
        />
        <h1 className="text-5xl font-bold mt-4 text-simBlue">SIMTRACE</h1>
        <p className="text-xl mt-2 text-simCyan">
          Connect. Protect. Recover.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-simDark/80 p-4 rounded-lg shadow">
          <h2 className="text-simCyan text-lg font-semibold">Devices</h2>
          <p className="text-3xl font-bold">{devices.length}</p>
        </div>
        <div className="bg-simDark/80 p-4 rounded-lg shadow">
          <h2 className="text-simCyan text-lg font-semibold">SIMs</h2>
          <p className="text-3xl font-bold">{sims.length}</p>
        </div>
        <div className="bg-simDark/80 p-4 rounded-lg shadow">
          <h2 className="text-simCyan text-lg font-semibold">Users</h2>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
      </div>

      {/* Devices Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-simBlue">Devices</h2>
        <div className="overflow-x-auto bg-simDark/80 p-4 rounded-lg shadow">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="border-b border-simBlue/50">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">SIM Number</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{d.name}</td>
                  <td className="px-4 py-2">{d.simNumber}</td>
                  <td className="px-4 py-2">{new Date(d.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIMs Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-simBlue">SIMs</h2>
        <div className="overflow-x-auto bg-simDark/80 p-4 rounded-lg shadow">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="border-b border-simBlue/50">
                <th className="px-4 py-2">Number</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Device</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {sims.map((s) => (
                <tr key={s.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{s.number}</td>
                  <td className="px-4 py-2">{s.status}</td>
                  <td className="px-4 py-2">{s.device?.name || "—"}</td>
                  <td className="px-4 py-2">{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-simBlue">Users</h2>
        <div className="overflow-x-auto bg-simDark/80 p-4 rounded-lg shadow">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="border-b border-simBlue/50">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2">{new Date(u.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Map placeholder */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-simBlue">Live Tracking Map</h2>
        <div className="h-96 bg-gray-800/60 rounded-lg shadow flex items-center justify-center text-gray-400">
          Map Component Coming Soon...
        </div>
      </div>
    </div>
  );
}
