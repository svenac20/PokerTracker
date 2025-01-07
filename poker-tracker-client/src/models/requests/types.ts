export enum Roles {
    ADMIN = 1,
    USER = 2,
}
export interface UserCreateRequest {
    id: string;
    email: string;
    username: string;
    roleId: number;
}

export interface GetUserResponse {
    guid: string;
    email: string;
    username: string;
    roleId: number;
}

export type Casino = {
    id: number;
    name: string;
    town: string;
}

export type GetCasinosResponse = {
    casinos: Casino[];
}
