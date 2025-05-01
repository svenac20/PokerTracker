import "server-only";
import prisma from "./prisma";
import { CasinoCardData, CasinoDropdownDto, CasinoDto } from "./types";
import {
  mapCasinoToCasinoDto,
  mapCasinoWithTownToCasinoCardDetails as mapCasinoWithTownToCasinoCardData,
  mapPokerGameToPokerGameDto,
  mapTournamentToTournamentDto,
} from "./utils";

export const getCasinosWithPokerGames = async (): Promise<CasinoDto[]> => {
  const casinos = await prisma.casino.findMany({
    orderBy: [{ priority: "desc" }],
    select: {
      town: {
        select: {
          name: true,
          countryId: true,
        },
      },
      id: true,
      name: true,
      location: true,
      townId: true,
      rake: true,
      information: true,
      imageUrl: true,
      pokerGames: {
        orderBy: [{ gameStarted: "desc" }, { startTime: "asc" }],
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
    orderBy: [{ priority: "desc" }],
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
          countryId: true,
        },
      },
      id: true,
      name: true,
      rake: true,
      location: true,
      information: true,
      imageUrl: true,
      townId: true,
      pokerGames: {
        orderBy: [{ gameStarted: "desc" }, { startTime: "asc" }],
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

export const getCasinoById = async (id: string) => {
  if (Number.isNaN(Number(id))) {
    return null;
  }

  return await prisma.casino.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const getCasinosIds = async () => {
  return await prisma.casino.findMany({
    select: {
      id: true,
    },
  });
};

export const getCasinos = async () => {
  const casinos = await prisma.casino.findMany({
    include: {
      town: true,
    },
    orderBy: {
      priority: "desc",
    },
  });

  return casinos.map((casino) => mapCasinoWithTownToCasinoCardData(casino));
};

export const getCasinosGroupedByTown = async (): Promise<
  Record<string, CasinoCardData[]>
> => {
  const casinos = await prisma.casino.findMany({
    include: {
      town: true,
    },
    orderBy: {
      priority: "desc",
    },
  });

  const groupedCasinos = casinos.reduce(
    (acc, casino) => {
      const townName = casino.town.name.toLocaleLowerCase();
      if (!acc[townName]) {
        acc[townName] = [];
      }
      acc[townName].push(mapCasinoWithTownToCasinoCardData(casino));
      return acc;
    },
    {} as Record<string, CasinoCardData[]>
  );

  return groupedCasinos;
};

export const getTowns = async () => {
  const towns = await prisma.town.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return towns.map((town) => ({
    id: town.id,
    name: town.name,
  }));
};

export const getTournaments = async () => {
  //find all tournaments for casinos with ids in casinoId
  const tournaments = await prisma.tournament.findMany({
    include: {
      casino: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  const tournamentsDto = tournaments.map((t) =>
    mapTournamentToTournamentDto(t)
  );
  return tournamentsDto;
};

export const getTournamentsByCasino = async (casinos: number[]) => {
  //find all tournaments for casinos with ids in casinoId
  const tournaments = await prisma.tournament.findMany({
    where: {
      casinoId: {
        in: casinos,
      },
    },
    include: {
      casino: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  const tournamentsDto = tournaments.map((t) =>
    mapTournamentToTournamentDto(t)
  );
  return tournamentsDto;
};

export const getTournamentByIdForUser = async (
  id: string,
  casinos: number[]
) => {
  if (Number.isNaN(Number(id))) {
    return null;
  }

  const tournament = await prisma.tournament.findUnique({
    where: {
      id: Number(id),
      casinoId: {
        in: casinos,
      },
    },
    include: {
      casino: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!tournament) {
    return null;
  }

  return mapTournamentToTournamentDto(tournament);
};


export const getCountriesForFilter = async () => {
  const countries = await prisma.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));
};

export const getTownsForFilter = async () => {
  const towns = await prisma.town.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return towns.map((town) => ({
    value: town.id,
    label: town.name,
  }));
}