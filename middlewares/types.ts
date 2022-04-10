import {Request} from "express";
import {IGetTask} from "../requests/types";

export interface IRequestUser extends Request {
    user?: IGetTask
}
export interface IRefreshTokenPayload{
    id:string
}
export interface IUser {
    id:number,
    login:string,
    password:string,
    refresh_id:string
}