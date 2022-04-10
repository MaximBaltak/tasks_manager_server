import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from 'jsonwebtoken'
import {refresh_token} from './../config/server.config.json'
import {db} from '../database'
import {IPayloadToken} from "../utils/types";
import {IRefreshTokenPayload, IRequestUser, IUser} from "./types";

export default async function confirmRefreshToken(refreshToken:string): Promise<IUser> {
    try {
        const payload:any=await jwt.verify(refreshToken,refresh_token.secret_key)
            const user:IUser[] = await db.query('SELECT * FROM users WHERE refresh_id=$1',[
                (payload as IRefreshTokenPayload).id
            ])
            return user[0]
    }catch (e){
        throw Error('токен не валидный')
    }
}