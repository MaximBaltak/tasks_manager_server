import express, {Router} from 'express'
import authorizationRequest from "../requests/authorizationRequest";

const router: Router = express.Router()
router.post('/signup', authorizationRequest.registration)
router.post('/signin', authorizationRequest.authorization)
export default router