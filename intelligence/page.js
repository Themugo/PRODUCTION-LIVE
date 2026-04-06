"use client";

import { useEffect, useState } from "react";

export default function IntelligencePage() {
  const [riskScore, setRiskScore] = useState(0);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulated AI analysis
    setRiskScore(78);
    setAlerts([
      "SIM swap detected",
      "New device login",
      "Location anomaly detected"
    ]);
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1>Intelligence Center</h1>
      <p>AI-powered device behavior analysis</p>

      {/* Risk Score */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Risk Score</h3>
        <p style={{ fontSize: "32px", color: "#f87171" }}>
          {riskScore}%
        </p>
      </div>

      {/* Alerts */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Active Alerts</h3>
        {alerts.map((alert, index) => (
          <p key={index}>⚠️ {alert}</p>
        ))}
      </div>

      {/* Timeline */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Recent Activity</h3>
        <p>📍 Nairobi - 2 mins ago</p>
        <p>📱 SIM Change - 10 mins ago</p>
        <p>🔐 Login Attempt - 30 mins ago</p>
      </div>
    </div>
  );
}
