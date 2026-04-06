import { getDB } from "@/lib/db"

export default async function ThreatDashboard(){

const db = await getDB()

const res = await db.query(`     SELECT *
    FROM threat_alerts
    ORDER BY created_at DESC
    LIMIT 100
  `)

await db.end()

return(

```
<div>

  <h2>SIMTRACE Threat Alerts</h2>

  <table border="1">

    <thead>
      <tr>
        <th>IMEI</th>
        <th>Type</th>
        <th>Score</th>
        <th>Description</th>
        <th>Time</th>
      </tr>
    </thead>

    <tbody>

      {res.rows.map((t,i)=>(
        <tr key={i}>
          <td>{t.imei}</td>
          <td>{t.threat_type}</td>
          <td>{t.threat_score}</td>
          <td>{t.description}</td>
          <td>{new Date(t.created_at).toLocaleString()}</td>
        </tr>
      ))}

    </tbody>

  </table>

</div>
```

)

}
