"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function LiveMap({ initialDevices = [] }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {initialDevices.map((device, i) => (
        <Marker
          key={i}
          position={[device.lat ?? 0, device.lng ?? 0]}
        >
          <Popup>{device.name ?? "Unknown Device"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
