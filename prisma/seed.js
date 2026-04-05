import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main(){
 await prisma.device.create({data:{imei:"123456789012345"}});
}
main().finally(()=>prisma.$disconnect());
