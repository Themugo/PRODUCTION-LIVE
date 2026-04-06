import Link from "next/link"

export default function UserDashboard(){

  return(
    <div>

      <h2>My Device Dashboard</h2>

      <ul>

        <li><Link href="/device/scan">Scan My Device</Link></li>

        <li><Link href="/dashboard/reports">Report Stolen Device</Link></li>

      </ul>

    </div>
  )
}
