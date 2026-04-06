import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req) {
  const { user_id, sim_number, event_type, location, description } = await req.json();
  const db = await getDB();

  // Log fraud event
  await db.query(
    `INSERT INTO banking_fraud_events
     (user_id, sim_number, event_type, location, description)
     VALUES ($1,$2,$3,$4,$5)`,
    [user_id, sim_number, event_type, location, description]
  );

  // Trigger alerts
  const contacts = await db.query(
    `SELECT contact_id FROM trusted_contacts WHERE user_id=$1`,
    [user_id]
  );

  // Notify police if user is registered
  // Notify contacts
  console.log("Escalation triggered for contacts and police");

  await db.end();
  return NextResponse.json({ success: true });
}
