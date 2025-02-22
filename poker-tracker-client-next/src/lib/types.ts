export enum Roles {
  ADMIN = 1,
  PLAYER = 2,
}

export enum GameTypes {
  PLO = 1,
  NLH = 2,
}

export type Casino = {
  id: number;
  name: string;
  town: string;
  pokerGames: PokerGameDto[];
};

export type GetCasinosResponse = {
  casinos: Casino[];
};

export type PokerGameDto = {
  id: number;
  limit: string;
  gameType: string;
  gameTypeId?: number;
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

export type GetCasinoPerUserResponse = {
  casinos: CasinoDropdownDto[];
};

export type DeletePokerGame = {
  pokerGameId: number;
  casinoId: number;
};
