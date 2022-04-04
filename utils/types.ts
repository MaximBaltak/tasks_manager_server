export interface IGenerateAccessToken{
    (id:number,login:string):string
}
export interface IGenerateRefreshToken{
    (id:string):string
}