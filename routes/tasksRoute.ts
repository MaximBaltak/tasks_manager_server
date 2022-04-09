import express, {Router} from 'express'
import confirmAccessToken from "../middlewares/confirmAccessToken";
import TasksRequest from "../requests/tasksRequest";

const router: Router = express.Router()
router.get('/', confirmAccessToken, TasksRequest.getTasks)
router.post('/', confirmAccessToken, TasksRequest.addTask)
router.put('/', confirmAccessToken, TasksRequest.updateTask)
router.delete('/', confirmAccessToken, TasksRequest.deleteTaskOrTasks)
export default router