import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add your seed data here
  await prisma.role.upsert({
    where: {
      id: 1,
    },
    update: {
      name: "Admin",
    },
    create: {
      id: 1,
      name: "Admin",
    },
  });

  await prisma.role.upsert({
    where: {
      id: 2,
    },
    update: {
      name: "Player",
    },
    create: {
      id: 2,
      name: "Player",
    },
  });

  await prisma.country.upsert({
    where: {
      id: 1,
    },
    update: {
      name: "Croatia",
    },
    create: {
      id: 1,
      name: "Croatia",
    },
  });

  await prisma.gameType.upsert({
    where: {
      id: 1,
    },
    update: {
      name: "PLO",
    },
    create: {
      id: 1,
      name: "PLO",
    },
  });

  await prisma.gameType.upsert({
    where: {
      id: 2,
    },
    update: {
      name: "NLH",
    },
    create: {
      id: 2,
      name: "NLH",
    },
  });

  await prisma.town.upsert({
    where: {
      id: 1,
    },
    update: {
      name: "Zagreb",
    },
    create: {
      id: 1,
      name: "Zagreb",
      countryId: 1,
    },
  });

  await prisma.town.upsert({
    where: {
      id: 2,
    },
    update: {
      name: "Rijeka",
      countryId: 1,
    },
    create: {
      id: 2,
      name: "Rijeka",
      countryId: 1,
    },
  });

  await prisma.casino.upsert({
    where: {
      id: 1,
    },
    update: {
      name: "Cezar",
      townId: 1,
    },
    create: {
      id: 1,
      name: "Cezar",
      townId: 1,
    },
  });

  await prisma.casino.upsert({
    where: {
      id: 2,
    },
    update: {
      name: "Admiral",
      townId: 1,
    },
    create: {
      id: 2,
      name: "Admiral",
      townId: 1,
    },
  });

  await prisma.casino.upsert({
    where: {
      id: 3,
    },
    update: {
      name: "Senator",
      townId: 2,
    },
    create: {
      id: 3,
      name: "Senator",
      townId: 2,
    },
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
