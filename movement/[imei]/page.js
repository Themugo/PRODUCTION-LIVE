import MovementMap from "@/components/MovementMap"

export default function MovementPage({params}){

const { imei } = params

return(

```
<div>

  <h2>Device Movement Intelligence</h2>

  <p>IMEI: {imei}</p>

  <MovementMap imei={imei}/>

</div>
```

)

}
