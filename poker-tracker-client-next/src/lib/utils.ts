import { User } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { JWT } from "next-auth/jwt";
import { twMerge } from "tailwind-merge";
import {
  CasinoCardData,
  CasinoDto,
  CasinoWithPokerGames,
  CasinoWithTown,
  PokerGameDto,
  PokerGameWithCasino,
  TournamentDto,
} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

// export function getErrorMessage(error: FirebaseError) {
//   if (error.code === 'auth/invalid-credential') {
//     return 'Invalid email or password';
//   }
//   return error.message;
// };

export function mapUserToToken(token: JWT, userDb: User) {
  token.id = userDb!.id;
  token.googleId = userDb!.googleId || "";
  token.email = userDb!.email;
  token.roleId = userDb!.roleId;
  token.name = userDb!.username;
}

export function mapCasinoToCasinoDto(casino: CasinoWithPokerGames): CasinoDto {
  return {
    id: casino.id,
    name: casino.name,
    town: casino.town.name,
    rake: casino.rake,
    location: casino.location,
    countryId: casino.town.countryId,
    townId: casino.townId,
    information: casino.information,
    imageUrl: casino.imageUrl,
    pokerGames: casino.pokerGames.map((game) => ({
      id: game.id,
      startTime: game.startTime,
      limit: game.limit,
      gameType: game.gameType.name,
      gameStarted: game.gameStarted,
      playerWaiting: game.playerWaiting,
      tablesNumber: game.tablesNumber,
      casinoName: casino.name,
      casinoId: casino.id,
    })),
  };
}

export function mapPokerGameToPokerGameDto(
  pokerGame: PokerGameWithCasino
): PokerGameDto {
  return {
    id: pokerGame.id,
    startTime: pokerGame.startTime,
    limit: pokerGame.limit,
    gameType: pokerGame.gameType.name,
    playerWaiting: pokerGame.playerWaiting,
    gameStarted: pokerGame.gameStarted,
    tablesNumber: pokerGame.tablesNumber,
    casinoId: pokerGame.casinoId,
    casinoName: pokerGame.casino.name,
  };
}

export function mapCasinoWithTownToCasinoCardDetails(
  casino: CasinoWithTown
): CasinoCardData {
  return {
    id: casino.id,
    name: casino.name,
    countryId: casino.town.countryId,
    townId: casino.townId,
    location: casino.location,
    town: casino.town.name,
    rake: casino.rake,
    information: casino.information,
    imageUrl: casino.imageUrl,
  };
}

export function mapTournamentToTournamentDto(
  tournament: {
    casino: {
      name: string;
    };
  } & {
    id: number;
    name: string;
    information: string | null;
    imageUrl: string;
    startTime: Date;
    gameStarted: boolean;
    casinoId: number;
    weeklyTournament: boolean;
  }
) {
  return {
    id: tournament.id,
    casinoId: tournament.casinoId,
    name: tournament.name,
    imageUrl: tournament.imageUrl,
    casinoName: tournament.casino.name,
    startTime: tournament.startTime,
    information: tournament.information,
    weeklyTournament: tournament.weeklyTournament,
  } as TournamentDto;
}
