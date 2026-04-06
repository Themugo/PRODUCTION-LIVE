import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function DashboardRouter() {

  const role = cookies().get("role")?.value

  if(role === "webhost") redirect("/dashboard/webhost")
  if(role === "admin") redirect("/dashboard/admin")
  if(role === "police") redirect("/dashboard/police")
  if(role === "telecom") redirect("/dashboard/telecom")
  if(role === "user") redirect("/dashboard/user")

  return <div>Loading dashboard...</div>
}
