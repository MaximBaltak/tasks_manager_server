import express, {Express, Request, Response} from 'express'
import { db } from './database/index.';
import {serverStart} from "./startServer";
import setCors from "./middlewares/CORS";
const app:Express= express()

app.use(setCors)
app.get("/",(req:Request, res:Response) => {
    res.send('hello')
})
serverStart(app,db)
