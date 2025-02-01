import "server-only";
import prisma from "./prisma";
import {
  CasinoDto
} from "./types";

export const fetchCasinos = async () => {
  const casinos = await prisma.casino.findMany({
    select: {
      town: {
        select: {
          name: true,
        },
      },
      id: true,
      name: true,
      pokerGames: {
        select: {
          id: true,
          limit: true,
          gameType: true,
          playerWaiting: true,
          tablesNumber: true,
          casinoId: true,
        },
      },
    },
  });

  const mappedCasinos = casinos.map((casino) => ({
    id: casino.id,
    name: casino.name,
    town: casino.town.name, // Get the town name as a string
    pokerGames: casino.pokerGames.map((game) => ({
      id: game.id,
      limit: game.limit,
      gameType: game.gameType.name,
      playerWaiting: game.playerWaiting,
      tablesNumber: game.tablesNumber,
      casinoName: casino.name,
      casinoId: casino.id
    })),
  }));

  return mappedCasinos;
};

export const fetchCasinosForUser = async (userId: string) => {
  console.log();
  const casinos = await prisma.casino.findMany({
    where: {
      owners: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      town: true,
    },
  });

  return casinos.map<CasinoDto>((casino) => {
    return {
      id: casino.id,
      name: casino.name,
      town: casino.town.name,
    };
  });
};
