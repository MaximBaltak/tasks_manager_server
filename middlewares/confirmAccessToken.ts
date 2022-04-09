import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from 'jsonwebtoken'
import {access_token} from './../config/server.config.json'
import {db} from '../database'
import {IPayloadToken} from "../utils/types";
import {IRequestUser} from "./types";

export default async function confirmAccessToken(req: IRequestUser, res: Response, next: NextFunction): Promise<void> {
    if (req.method === 'OPTIONS') {
        next()
    }
    const token: string = req.headers['authorization']?.split(' ')[1] || ''
    if (!token) {
        res.status(403).json({message: 'пользователь не авторизован'})
    }
    try {
        const payload: JwtPayload | string = await jwt.verify(token, access_token.secret_key)
        try {
            const user: any = await db.query('SELECT * FROM users WHERE id=$1 AND login=$2', [
                (payload as IPayloadToken).id,
                (payload as IPayloadToken).login,
            ])
            req.user = user[0]
            next()
        } catch (e) {
            console.log(e)
            res.status(403).json({message: "Пользователь не авторизован"})
        }

    } catch (e) {
        res.status(403).json({message: "Пользователь не авторизован"})
    }
}