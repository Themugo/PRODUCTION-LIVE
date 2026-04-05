"use client";

import LiveMap from "@/components/LiveMap"; // make sure this path exists

export default function Dashboard() {
  const devices = [];
  const sims = [];
  const users = [];

  return (
    <div className="min-h-screen bg-simtrace-light p-6 font-sans">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="SimTrace Logo" className="h-12 w-12" />
          <div>
            <h1 className="text-2xl font-bold text-simtrace-dark">SIMTRACE</h1>
            <p className="text-sm text-simtrace-secondary">Connect. Protect. Recover.</p>
          </div>
        </div>
      </header>

      {/* Stats cards */}
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

      {/* LiveMap */}
      <div className="bg-white rounded-lg shadow p-0 h-96 overflow-hidden">
        <LiveMap initialDevices={devices} />
      </div>
    </div>
  );
}
