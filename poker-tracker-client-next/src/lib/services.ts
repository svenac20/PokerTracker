import "server-only";
import prisma from "./prisma";
import { CasinoDto, CasinoDropdownDto, PokerGameDto } from "./types";
import { mapCasinoToCasinoDto, mapPokerGameToPokerGameDto } from "./utils";

export const fetchCasinos = async (): Promise<CasinoDto[]> => {
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

export const fetchPokerGamesForUser = async (userId: string) => {
  const casinos = await prisma.casino.findMany({
    where: {
      owners: {
        some: {
          id: userId,
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

export const fetchCasinosForUser = async (userId: string) => {
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
};

export const getPokerGameByIdForUser = async (
  pokerGameId: number,
  userId: string
) => {
  const pokerGame = await prisma.pokerGame.findUnique({
    where: {
      id: pokerGameId,
      casino: {
        owners: {
          some: {
            id: userId,
          },
        },
      },
    },
    include: {
      casino: {
        select: {
          name: true,
        },
      },
      gameType: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!pokerGame) {
    return;
  }

  return mapPokerGameToPokerGameDto(pokerGame);
};