export enum Roles {
  ADMIN = 1,
  USER = 2,
}

export enum GameTypes {
  PLO = 1,
  NLO = 2,
}
export interface UserCreateRequest {
  id: string;
  email: string;
  username: string;
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
};

export type GetCasinosResponse = {
  casinos: Casino[];
};

export type PokerGame = {
  id: number;
  limit: string;
  gameType: string;
  playerWaiting: number;
  casinoName: string;
  tablesNumber: string;
};
