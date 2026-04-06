import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req){
  const { imei, reporter_email } = await req.json();
  const db = await getDB();

  // Mark device as emergency
  await db.query(
    `UPDATE devices
     SET emergency_mode=true,status='STOLEN'
     WHERE imei=$1`,
    [imei]
  );

  // Notify trusted contacts
  const user = await db.query(
    `SELECT guardian_1_email, guardian_2_email, guardian_3_email
     FROM users
     WHERE id=(SELECT owner_id FROM devices WHERE imei=$1)`,
    [imei]
  );

  const guardians = Object.values(user.rows[0]).filter(Boolean);

  // Here we can send emails or notifications to guardians
  console.log("Notify guardians:", guardians, "about emergency device:", imei);

  await db.end();
  return NextResponse.json({success:true, notified:guardians});

  import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

// Replace this with Twilio/SendGrid or any SMS/Email service
async function sendNotification(to, method, message){
  console.log(`Sending ${method} to ${to}: ${message}`);
  // Here integrate real SMS/email provider
}

export async function POST(req){
  const { imei, reporter_email } = await req.json();
  const db = await getDB();

  const deviceRes = await db.query(
    `UPDATE devices
     SET emergency_mode=true,status='STOLEN'
     WHERE imei=$1
     RETURNING id,owner_id`,
    [imei]
  );

  const device = deviceRes.rows[0];

  const user = await db.query(
    `SELECT guardian_1_email, guardian_2_email, guardian_3_email
     FROM users WHERE id=$1`,
    [device.owner_id]
  );

  const guardians = Object.values(user.rows[0]).filter(Boolean);
  const message = `Emergency mode activated for device ${imei}.`;

  for(const g of guardians){
    await sendNotification(g,'Email',message);
    await db.query(
      `INSERT INTO emergency_notifications(device_id,notified_to,method,message)
       VALUES($1,$2,$3,$4)`,
      [device.id,g,'Email',message]
    );
  }

  await db.end();

  return NextResponse.json({success:true, notified:guardians});
}
}
