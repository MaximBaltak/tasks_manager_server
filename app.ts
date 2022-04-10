import express, {Express, Request, Response} from 'express'
import {db} from './database';
import {serverStart} from "./startServer";
import setCors from "./middlewares/CORS";
import authRouter from './routes/authRoute'
import tasksRoute from "./routes/tasksRoute";
import recordingRoute from './routes/recordingRoute';

const app: Express = express()
app.use(express.json())
app.use(setCors)
app.use('/auth', authRouter)
app.use('/tasks', tasksRoute)
app.use('/refresh', recordingRoute)
app.get("/", (req: Request, res: Response) => {
    res.send('hello')
})
serverStart(app, db)
