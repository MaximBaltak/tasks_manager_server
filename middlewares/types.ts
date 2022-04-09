import {Request} from "express";
import {IGetTask} from "../requests/types";

export interface IRequestUser extends Request {
    user?: IGetTask
}