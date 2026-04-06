import MovementMap from "@/components/MovementMap"

export default function RecoveryPage({params}){

const { imei } = params

return(

```
<div>

  <h2>Device Recovery Tracking</h2>

  <p>Tracking stolen device: {imei}</p>

  <MovementMap imei={imei}/>

</div>
```

)

}
