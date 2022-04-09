import {NextFunction, Request, Response} from "express";

export default async function setCors(peq: Request, res: Response, next: NextFunction): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization")
    next()
}