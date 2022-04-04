import {Request, Response} from "express";

export interface IAuthorizationRequest{
    authorization(req:Request,res:Response):void
    registration(req:Request,res:Response):void
}