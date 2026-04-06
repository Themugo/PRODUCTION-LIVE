import DeviceNetworkGraph from "@/components/DeviceNetworkGraph"

export default function InvestigationPage({params}){

const {imei} = params

return(

```
<div>

  <h2>Device Investigation</h2>

  <p>IMEI: {imei}</p>

  <DeviceNetworkGraph imei={imei}/>

</div>
```

)

}
