// app/api/register-device/route.js
export async function POST(req){
  const { imei, user_id } = await req.json();
  const db = await getDB();

  const user = await db.query(
    `SELECT owner_tier FROM devices
     JOIN users ON devices.owner_id=users.id
     WHERE users.id=$1`,
    [user_id]
  );

  // Count devices user already has
  const count = await db.query(
    "SELECT COUNT(*) FROM devices WHERE owner_id=$1",
    [user_id]
  );

  const tier_limits = {FREE:1, PRO:3, PREMIUM:10};
  const limit = tier_limits[user.rows[0]?.owner_tier || 'FREE'];

  if(parseInt(count.rows[0].count) >= limit){
    return NextResponse.json({success:false,error:"Tier limit reached"});
  }

  await db.query(
    `INSERT INTO devices (imei,owner_id,status)
     VALUES($1,$2,'ACTIVE')`,
    [imei,user_id]
  );

  await db.end();
  return NextResponse.json({success:true});

  const tier_limits = {FREE:1, PRO:3, PREMIUM:10, ENTERPRISE:50};
const limit = tier_limits[user.rows[0]?.owner_tier || 'FREE'];

if(parseInt(count.rows[0].count) >= limit){
  return NextResponse.json({success:false,error:`Tier limit reached: ${limit} devices. Upgrade to register more.`});
}
}
