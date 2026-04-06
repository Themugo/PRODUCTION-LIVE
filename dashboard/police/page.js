import Link from "next/link"

export default function PoliceDashboard(){

  return(
    <div>

      <h2>Police Investigation Dashboard</h2>

      <ul>

        <li><Link href="/intelligence">Live Intelligence Map</Link></li>

        <li><Link href="/dashboard/reports">Investigation Reports</Link></li>

        <li><Link href="/device/scan">Scan Suspect Device</Link></li>

      </ul>

    </div>
  )
}
