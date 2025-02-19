
export enum Roles {
  ADMIN = 1,
  PLAYER = 2,
}

export enum GameTypes {
  PLO = 1,
  NLO = 2,
}
export interface CreateUserRequest {
  id?: string;
  googleId?: string;
  email: string;
  username?: string;
  roleId?: number;
}

export type CreateUserResponse = {
  id: string;
  googleId: string;
  email: string;
  name: string;
  roleId: number;
}

export interface GetUserResponse {
  id: string;
  email: string;
  name: string;
  roleId: number;
}

export type Casino = {
  id: number;
  name: string;
  town: string;
  pokerGames: PokerGame[];
};

export type GetCasinosResponse = {
  casinos: Casino[];
};

export type PokerGame = {
  id: number;
  limit: string;
  gameType: string;
  gameTypeId?: number;
  playerWaiting: number;
  casinoId: number;
  casinoName: string;
  tablesNumber: number;
};

export type CasinoDto = {
  id: number;
  name: string;
  town: string;
}


export type GetCasinoPerUSerResponse = {
  casinos: CasinoDto[];
}

export type DeletePokerGame = {
  pokerGameId: number;
  casinoId: number;
}
