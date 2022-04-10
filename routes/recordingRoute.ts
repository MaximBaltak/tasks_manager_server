import express, {Router} from 'express'
import recordingRequest from "../requests/recordingRequest";

const router: Router = express.Router()
router.post('/', recordingRequest.update)
export default router