'use client'

import dynamic from "next/dynamic"

const DeviceTimelineMap = dynamic(() => import("@/components/DeviceTimelineMap"), { ssr: false })

export default function TimelinePage({ params }) {
  const { imei } = params
  return (
    <div>
      <h2>Device Timeline</h2>
      <p>IMEI: {imei}</p>
      <DeviceTimelineMap imei={imei} />
    </div>
  )
}
