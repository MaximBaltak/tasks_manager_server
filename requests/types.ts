import {Request, Response} from "express";
import {IRequestUser} from "../middlewares/types";

export interface IAuthorizationRequest {
    authorization(req: Request, res: Response): void

    registration(req: Request, res: Response): void
}

export interface ITasksRequest {
    getTasks(req: IRequestUser, res: Response): void

    addTask(req: IRequestUser, res: Response): void

    updateTask(req: IRequestUser, res: Response): void

    deleteTaskOrTasks(req: IRequestUser, res: Response): void
}
export interface IUpdateToken{
    update(req:Request,res:Response):void
}

export interface ITask {
    title: string,
    done: boolean,
}

export interface IGetTask extends ITask {
    id: number
}