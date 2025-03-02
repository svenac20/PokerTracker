import { clsx, type ClassValue } from "clsx";
import { JWT } from "next-auth/jwt";
import { twMerge } from "tailwind-merge";
import { CasinoDto, CasinoWithPokerGames, PokerGameDto, PokerGameWithCasino } from "./types";
import { User } from "@prisma/client";

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

export function mapCasinoToCasinoDto(casino: CasinoWithPokerGames) : CasinoDto {
  return {
    id: casino.id,
    name: casino.name,
    town: casino.town.name, // Get the town name as a string
    pokerGames: casino.pokerGames.map((game) => ({
      id: game.id,
      startTime: game.startTime,
      limit: game.limit,
      gameType: game.gameType.name,
      playerWaiting: game.playerWaiting,
      tablesNumber: game.tablesNumber,
      casinoName: casino.name,
      casinoId: casino.id,
    })),
  };
}

export function mapPokerGameToPokerGameDto(pokerGame: PokerGameWithCasino) : PokerGameDto {
  return {
    id: pokerGame.id,
    startTime: pokerGame.startTime,
    limit: pokerGame.limit,
    gameType: pokerGame.gameType.name,
    playerWaiting: pokerGame.playerWaiting,
    tablesNumber: pokerGame.tablesNumber,
    casinoId: pokerGame.casinoId,
    casinoName: pokerGame.casino.name,
  };
}