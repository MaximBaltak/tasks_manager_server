import {IGenerateAccessToken, IGenerateRefreshToken, IPayloadToken} from "./types";
import jwt from 'jsonwebtoken'
import {access_token, refresh_token} from './../config/server.config.json'

export const generateAccessToken: IGenerateAccessToken = (id, login) => {
    const payload: IPayloadToken = {
        id,
        login
    }
    return jwt.sign(payload, access_token.secret_key, {
        expiresIn: access_token.time
    })
}
export const generateRefreshToken: IGenerateRefreshToken = id => {
    const payload = {
        id,
    }
    return jwt.sign(payload, refresh_token.secret_key, {
        expiresIn: refresh_token.time
    })
}

