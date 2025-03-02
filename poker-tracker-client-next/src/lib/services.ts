import "server-only";
import prisma from "./prisma";
import { CasinoDto, CasinoDropdownDto, PokerGameDto } from "./types";
import { mapCasinoToCasinoDto, mapPokerGameToPokerGameDto } from "./utils";

export const getCasinosWithPokerGames = async (): Promise<CasinoDto[]> => {
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
          startTime: true,
          playerWaiting: true,
          tablesNumber: true,
          casinoId: true,
        },
      },
    },
  });

  const mappedCasinos = casinos.map((casino) => mapCasinoToCasinoDto(casino));
  return mappedCasinos;
};

export const getCasinosWithPokerGamesForUser = async (userId: string) => {
  const casinos = await prisma.casino.findMany({
    where: {
      owners: {
        some: {
          id: userId
        },
      },
    },
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
          startTime: true,
        },
      },
    },
  });

  return casinos.map((casino) => mapCasinoToCasinoDto(casino));
};

export const getCasinosDropdownForUser = async (userId: string) => {
  const casinos = await prisma.casino.findMany({
    where: {
      owners: {
        some: {
          id: userId
        },
      },
    },
    include: {
      town: true,
    },
  });
  return casinos.map<CasinoDropdownDto>((casino) => {
    return {
      id: casino.id,
      name: casino.name,
      town: casino.town.name
    };
  });
};

export const getCasinoDetailsForUser = async (userId: string) => {
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

  return casinos.map<CasinoDropdownDto>((casino) => {
    return {
      id: casino.id,
      name: casino.name,
      town: casino.town.name,
    };
  });
}

export const getPokerGameByIdForUser = async (
  pokerGameId: number,
) => {
  const pokerGame = await prisma.pokerGame.findUnique({
    where: {
      id: pokerGameId,
    },
    include: {
      casino: {
        select: {
          name: true,
        },
      },
      gameType: {
        select: {
          name: true
        }
      }
    },
  });

  if (!pokerGame) {
    return;
  }

  return mapPokerGameToPokerGameDto(pokerGame);
};