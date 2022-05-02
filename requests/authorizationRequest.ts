import {IAuthorizationRequest} from "./types";
import {Request, Response} from "express";
import {compareSync, hashSync} from 'bcrypt'
import {access_token} from './../config/server.config.json'
import {v4} from "uuid"
import {db} from "../database";
import {generateAccessToken, generateRefreshToken} from "../utils/ganerates";

class AuthorizationRequest implements IAuthorizationRequest {
    public async authorization(req: Request, res: Response) {
        const {login, password} = req.body
        if (login && password) {
            try {
                const user: any = await db.query('SELECT * FROM users WHERE login=$1', [
                    login,
                ])
                if(user){
                    if (compareSync(password, user[0].password) && user) {
                        const accessToken = generateAccessToken(user[0].id, login)
                        const refreshToken = generateRefreshToken(user[0].refresh_id)
                        res.status(200).json({
                            message: 'авторизация успешна',
                            accessToken,
                            refreshToken,
                            access_expiresIn: access_token.time,
                            access_createDate: new Date().getTime(),

                        })
                    } else {
                        res.status(500).json({message: 'такого пользователя не существует'})
                    }
                }else {
                    res.status(500).json({message: 'Ошибка сервера'})
                }

            } catch (e) {
                res.status(500).json({message: 'такого пользователя не существует'})
            }
        } else {
            res.status(400).json({message: 'нет данных'})
        }
    }

    public async registration(req: Request, res: Response) {
        const {login, password} = req.body
        if (login && password) {
            const refreshId: string = v4()
            const hashPassword: string = hashSync(password, 10)
            try {
                const user: any = await db.query('INSERT INTO users (login, password,refresh_id) VALUES ($1,$2,$3) returning *', [
                    login,
                    hashPassword,
                    refreshId
                ])
                const accessToken = generateAccessToken(user[0].id, login)
                const refreshToken = generateRefreshToken(user[0].refresh_id)
                res.status(200).json({
                    message: 'пользователь добавлен',
                    accessToken,
                    refreshToken,
                    access_expiresIn: access_token.time,
                    access_createDate: new Date().getTime()
                })
            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'такой пользователь уже есть'})
            }
        } else {
            res.status(400).json({message: 'нет данных'})
        }
    }
}

export default new AuthorizationRequest()