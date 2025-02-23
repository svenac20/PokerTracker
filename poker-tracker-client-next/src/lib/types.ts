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
  pokerGames: PokerGameDto[];
};

export type GetCasinosResponse = {
  casinos: CasinoDto[];
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

export type DeletePokerGameMessage = {
  pokerGameId: number;
  casinoId: number;
};
