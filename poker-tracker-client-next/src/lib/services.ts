import "server-only";
import prisma from "./prisma";
import {
  CasinoDropdownDto,
  CasinoDto
} from "./types";
import {
  mapCasinoToCasinoDto,
  mapCasinoWithTownToCasinoCardDetails as mapCasinoWithTownToCasinoCardData,
  mapPokerGameToPokerGameDto,
} from "./utils";

export const getCasinosWithPokerGames = async (): Promise<CasinoDto[]> => {
  const casinos = await prisma.casino.findMany({
    orderBy: [{priority: 'desc'}],
    select: {
      town: {
        select: {
          name: true,
        },
      },
      id: true,
      name: true,
      location: true,
      rake: true,
      information: true,
      pokerGames: {
        orderBy: [
          {gameStarted: 'desc'},
          {startTime: 'asc'},
        ],
        select: {
          id: true,
          limit: true,
          gameType: true,
          gameStarted: true,
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
    orderBy: [{priority: 'desc'}],
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
      rake: true,
      location: true,
      information: true,
      pokerGames: {
        orderBy: [
          {gameStarted: 'desc'},
          {startTime: 'asc'},
        ],
        select: {
          id: true,
          limit: true,
          gameType: true,
          playerWaiting: true,
          tablesNumber: true,
          casinoId: true,
          startTime: true,
          gameStarted: true,
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

  return casinos.map((casino) => mapCasinoWithTownToCasinoCardData(casino));
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

export const getCasinoDetailsById = async (id: string, userId: string) => {
  if (Number.isNaN(Number(id))) {
    return null;
  }

  const casino = await prisma.casino.findUnique({
    where: {
      id: Number(id),
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

  if (!casino) {
    return null;
  }

  return mapCasinoWithTownToCasinoCardData(casino);
};

export const getCasinoById = async(id: string) => {
  if (Number.isNaN(Number(id))) {
    return null;
  }

  return await prisma.casino.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export const getCasinosIds = async () => {
  return await prisma.casino.findMany({
    select: {
      id: true,
    }
  });
}