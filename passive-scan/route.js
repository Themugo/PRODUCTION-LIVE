import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req){
  const { reporter_imei, detections } = await req.json();
  const db = await getDB();

  const reporter = await db.query("SELECT id FROM devices WHERE imei=$1", [reporter_imei]);
  if(!reporter.rows.length) return NextResponse.json({success:false, error:"Reporter device not found"});

  const reporter_id = reporter.rows[0].id;

  for(let d of detections){
    await db.query(
      `INSERT INTO passive_scans (reporter_device_id,target_imei,target_sim,latitude,longitude)
       VALUES($1,$2,$3,$4,$5)
       ON CONFLICT DO NOTHING`,
      [reporter_id,d.imei,d.sim,d.lat,d.lng]
    );
  }

  await db.end();
  return NextResponse.json({success:true});

  if(device.status === 'STOLEN' || device.emergency_mode){
  // flag detection as high-priority
  await db.query(
    `INSERT INTO threat_alerts
     (device_id,imei,threat_type,threat_score,description,latitude,longitude)
     VALUES($1,$2,'EMERGENCY_DEVICE_DETECTED',99,'Emergency device detected',$3,$4)`,
    [device.id,imei,latitude,longitude]
  );
}
}
