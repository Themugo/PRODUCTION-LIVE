import Link from "next/link"

export default function WebhostDashboard(){

  return(
    <div>

      <h2>SIMTRACE System Command Center</h2>

      <ul>

        <li><Link href="/dashboard/users">Manage Users</Link></li>

        <li><Link href="/dashboard/devices">Manage Devices</Link></li>

        <li><Link href="/intelligence">Global Intelligence Map</Link></li>

        <li><Link href="/dashboard/reports">Incident Reports</Link></li>

        <li><Link href="/dashboard/blacklist">IMEI Blacklist</Link></li>

      </ul>

    </div>
  )
}
