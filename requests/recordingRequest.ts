import {IUpdateToken} from "./types";
import {Request, Response} from "express";
import {IUser} from "../middlewares/types";
import confirmRefreshToken from "../middlewares/confirmRefreshToken";
import {generateAccessToken, generateRefreshToken} from "../utils/ganerates";
import { v4 } from "uuid";
import {access_token} from "../config/server.config.json";
import {db} from "../database";

export class RecordingRequest implements IUpdateToken {
   public async update(req:Request, res:Response): Promise<void>{
        if(req.body?.refreshToken){
            try {
                const user:IUser=await confirmRefreshToken(req.body.refreshToken);
                const accessToken:string=generateAccessToken(user.id,user.login)
                const refreshId:string=v4()
                const refreshToken:string=generateRefreshToken(refreshId)
                try {
                    await db.query("UPDATE users SET refresh_id=$1 WHERE login=$2",[
                        refreshId,
                        user.login
                    ])
                    res.status(200).json({message:'токен обновлен',
                        accessToken,
                        refreshToken,
                        access_expiresIn: access_token.time,
                        access_createDate: new Date().getTime()
                    })
                }catch (e){
                    res.status(500).json({message:"ошибка сервера"})
                }
            }catch (e){
                res.status(403).json({message:"токен не валидный"})
            }
        }else{
            res.status(400).json({message:"нет данных"})
        }
    }
}

export default new RecordingRequest()