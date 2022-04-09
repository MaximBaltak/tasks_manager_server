export interface IGenerateAccessToken {
    (id: number, login: string): string
}

export interface IGenerateRefreshToken {
    (id: string): string
}

export interface IPayloadToken {
    id: number,
    login: string,

}