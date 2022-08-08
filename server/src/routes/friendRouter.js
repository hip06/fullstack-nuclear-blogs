import express from 'express'
import * as friendController from '../controllers/friendController'


const router = express.Router()

router.post('/create-friend-request', friendController.createFriendRequest)


export default router