import LiveIntelligenceMap from "@/components/LiveIntelligenceMap"
import ThreatFeed from "@/components/ThreatFeed"
import SystemStats from "@/components/SystemStats"

export default function CommandCenter(){

return(

```
<div>

  <h1>SIMTRACE Intelligence Command Center</h1>

  <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"20px"}}>

    <div>
      <LiveIntelligenceMap/>
    </div>

    <div>
      <ThreatFeed/>
      <SystemStats/>
    </div>

  </div>

</div>
```
  <Link href="/intelligence/heatmap">
  Crime Heatmap
</Link>

)

}
