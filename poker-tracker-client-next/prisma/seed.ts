import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Add your seed data here
  await prisma.role.upsert({
    where: {
        id: 1
    },
    update: {
        name: "Admin"
    },
    create: {
        id: 1,
        name: "Admin",
    }
  });

  await prisma.role.upsert({
    where: {
        id: 2
    },
    update: {
        name: "Player"
    },
    create: {
        id: 2,
        name: "Player",
    }
  });
  // Add more seed data as needed
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });