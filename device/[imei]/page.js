export default function DevicePage({ params }) {
  const { imei } = params
  return (
    <div>
      <h2>Device Investigation</h2>
      <p>IMEI: {imei}</p>
      <a href={`/device/${imei}/timeline`}>View Timeline Map</a>
    </div>
  )
}
