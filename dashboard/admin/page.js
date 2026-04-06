import Link from "next/link"

export default function AdminDashboard(){

  return(
    <div>

      <h2>Admin Operations Center</h2>

      <ul>

        <li><Link href="/device/scan">Scan Device</Link></li>

        <li><Link href="/dashboard/devices">Device Monitoring</Link></li>

        <li><Link href="/intelligence">Detection Map</Link></li>

        <li><Link href="/dashboard/reports">Reports</Link></li>

      </ul>

    </div>
  )
}
