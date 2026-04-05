"use client";

import LiveMap from "@/components/LiveMap"; // Make sure this exists

export default function Dashboard() {
  // Safe defaults to prevent runtime errors
  const devices = [];
  const sims = [];
  const users = [];

  return (
    <div className="min-h-screen bg-simtrace-light p-6 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="SimTrace Logo" className="h-12 w-12" />
          <div>
            <h1 className="text-2xl font-bold text-simtrace-dark">SIMTRACE</h1>
            <p className="text-sm text-simtrace-secondary">Connect. Protect. Recover.</p>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-simtrace-info text-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold">Devices</h2>
          <p className="text-3xl mt-2">{devices.length}</p>
        </div>
        <div className="bg-simtrace-success text-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold">SIMs</h2>
          <p className="text-3xl mt-2">{sims.length}</p>
        </div>
        <div className="bg-simtrace-accent text-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-3xl mt-2">{users.length}</p>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Devices Table */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <h3 className="font-semibold text-simtrace-dark mb-2">Devices</h3>
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">SIM Number</th>
                <th className="py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {devices.length ? (
                devices.map((d, i) => (
                  <tr key={i} className="border-b hover:bg-simtrace-light">
                    <td className="py-2">{d.name ?? "-"}</td>
                    <td className="py-2">{d.simNumber ?? "-"}</td>
                    <td className="py-2">{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-400">No devices found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SIMs Table */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <h3 className="font-semibold text-simtrace-dark mb-2">SIMs</h3>
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b">
              <tr>
                <th className="py-2">Number</th>
                <th className="py-2">Status</th>
                <th className="py-2">Device</th>
                <th className="py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {sims.length ? (
                sims.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-simtrace-light">
                    <td className="py-2">{s.number ?? "-"}</td>
                    <td className="py-2">{s.status ?? "-"}</td>
                    <td className="py-2">{s.deviceName ?? "-"}</td>
                    <td className="py-2">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-400">No SIMs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <h3 className="font-semibold text-simtrace-dark mb-2">Users</h3>
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((u, i) => (
                  <tr key={i} className="border-b hover:bg-simtrace-light">
                    <td className="py-2">{u.name ?? "-"}</td>
                    <td className="py-2">{u.email ?? "-"}</td>
                    <td className="py-2">{u.role ?? "-"}</td>
                    <td className="py-2">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-400">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Map */}
      <div className="bg-white rounded-lg shadow p-0 h-96 overflow-hidden">
        <LiveMap initialDevices={devices} />
      </div>
    </div>
  );
}
