"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LiveMap({ initialDevices = [] }) {
  const [devices, setDevices] = useState(initialDevices);

  useEffect(() => {
    const interval = setInterval(async () => {
      // Replace this with your real API endpoint
      const updatedDevices = await fetch("/api/devices/live")
        .then((res) => res.json())
        .catch(() => devices);

      setDevices(updatedDevices);
    }, 5000);

    return () => clearInterval(interval);
  }, [devices]);

  const defaultCenter = [0.0, 36.8219]; // Nairobi
  const mapCenter =
    devices.length > 0
      ? [devices[0].latitude || 0, devices[0].longitude || 36.8219]
      : defaultCenter;

  return (
    <MapContainer center={mapCenter} zoom={10} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {devices.map((device) => (
        <Marker
          key={device.id}
          position={[device.latitude || 0, device.longitude || 36.8219]}
        >
          <Popup>
            <strong>{device.name}</strong>
            <br />
            SIM: {device.simNumber || "-"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
