import {IConnectionDB} from "../config/types";
import pg, {IDatabase} from "pg-promise";
import {IClient} from "pg-promise/typescript/pg-subset";
import dbConfig from '../config/db.config.json'
const connection:IConnectionDB={
    user:dbConfig.user,
    password:dbConfig.password,
    port:dbConfig.port,
    host:dbConfig.host,
    database:dbConfig.database
}
export const db:IDatabase<{},IClient>=pg()(connection)