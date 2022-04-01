import express from 'express'
import pg from 'pg-promise'
import dbConfig from './db.config.json'
const app = express()
const port:string=process.env.PORT||'4000'
const connection={
    user:dbConfig.user,
    password:dbConfig.password,
    port:dbConfig.port,
    host:dbConfig.host,
    database:dbConfig.database
}
const db=pg()(connection)


app.listen(port,async()=>{
    try {
        await db.connect()
        console.log('connected database')
    }catch (e){
        console.log('not connected database')
    }
    console.log('server listening on port '+port)
})