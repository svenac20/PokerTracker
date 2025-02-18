import "server-only";
import prisma from "./prisma";
import { Casino, CasinoDto, PokerGame } from "./types";
import PokerGameCard from "@/components/ui/pokerGameCard";

export const fetchCasinos = async (): Promise<Casino[]> => {
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
      casinoId: casino.id,
    })),
  }));

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
        },
      },
    },
  });

  return casinos.map(
    (casino) =>
      ({
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
          casinoId: casino.id,
        })),
      } as Casino)
  );
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

export const getPokerGameByIdForUser = async (pokerGameId: number, userId: string) => {
  const pokerGame = await prisma.pokerGame.findUnique({
    where: {
      id: pokerGameId,
      casino: {
        owners: {
          some: {
            id: userId,
          },
        }
      }
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
    return
  }

  return {
    id: pokerGame.id,
    casinoId: pokerGame.casinoId,
    casinoName: pokerGame.casino.name,
    gameTypeId: pokerGame.gameTypeId,
    limit: pokerGame.limit,
    playerWaiting: pokerGame.playerWaiting,
    tablesNumber: pokerGame.tablesNumber,
  } as PokerGame
}


export const checkIfUserIsOwner = async (userId: string, pokerGameId: number) => {
  return !!await prisma.pokerGame.findFirst({
    where: {
      casino: {
        owners: {
          some: {
            id: userId,
          },
        },  
      },
      id: pokerGameId
    }
  })
}