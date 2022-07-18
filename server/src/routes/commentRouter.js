import express from 'express'
import * as commentController from '../controllers/commentController'
import verifyToken from '../middleware/verifyToken'

const router = express.Router()

router.post('/create-one', verifyToken, commentController.createComment)
router.get('/get-all-by-postId', commentController.getCommentsByPostId)




export default router