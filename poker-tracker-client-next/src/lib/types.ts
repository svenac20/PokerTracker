export enum Roles {
  ADMIN = 1,
  PLAYER = 2,
}

export enum GameTypes {
  PLO = 1,
  NLH = 2,
}

export type CasinoDto = {
  id: number;
  name: string;
  town: string;
  location: string | null;
  pokerGames: PokerGameDto[];
  rake: string | null;
  information: string | null;
};

export type PokerGameDto = {
  id: number;
  limit: string;
  startTime: Date;
  gameType: string;
  gameTypeId?: number;
  gameStarted: boolean;
  playerWaiting: number;
  casinoId: number;
  casinoName: string;
  tablesNumber: number;
};

export type CasinoDropdownDto = {
  id: number;
  name: string;
  town: string;
};

export type CasinoCardData = {
  id: number;
  name: string;
  town: string;
  location: string | null;
  rake: string | null;
  information: string | null;
};

export type DeletePokerGameMessage = {
  pokerGameId: number;
  casinoId: number;
};

export type CasinoWithPokerGames = {
  id: number;
  name: string;
  rake: string | null;
  location: string | null;
  information: string | null;
  town: {
    name: string;
  };
  pokerGames: {
    id: number;
    limit: string;
    startTime: Date;
    playerWaiting: number;
    tablesNumber: number;
    gameStarted: boolean;
    casinoId: number;
    gameType: {
      id: number;
      name: string;
    };
  }[];
};

export type PokerGameWithCasino = {
  id: number;
  limit: string;
  startTime: Date;
  gameTypeId: number;
  playerWaiting: number;
  tablesNumber: number;
  gameStarted: boolean;
  casinoId: number;
  gameType: {
    name: string;
  };
  casino: {
    name: string;
  };
};

export type CasinoWithTown = {
  id: number;
  name: string;
  townId: number;
  rake: string | null;
  location: string | null;
  information: string | null;
  town: {
    id: number;
    name: string;
    countryId: number;
  };
};

export interface CasinoGroupedByTownDto {
  town: string;
  casinos: CasinoCardData[];
}