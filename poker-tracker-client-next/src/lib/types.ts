export enum Roles {
  ADMIN = 1,
  PLAYER = 2,
}

export enum GameTypes {
  PLO = 1,
  NLH = 2,
}

export type CasinoBaseType = {
  id: number;
  name: string;
  town: string;
  location: string | null;
  rake: string | null;
  information: string | null;
  imageUrl: string | null;
};

export type CasinoDto = CasinoBaseType & {
  pokerGames: PokerGameDto[];
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

export type CasinoCardData = CasinoBaseType;

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
  imageUrl: string | null;
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
  imageUrl: string | null;
  town: {
    id: number;
    name: string;
    countryId: number;
  };
};

export type CasinoGroupedByTownDto = {
  town: string;
  casinos: CasinoCardData[];
}


export type TournamentDto = {
  id: number;
  imageUrl: string;
  name: string;
  casinoId: number;
}