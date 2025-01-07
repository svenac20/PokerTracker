export enum Roles {
    ADMIN = 1,
    USER = 2,
}
export interface UserCreateRequest {
    guid: string;
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
