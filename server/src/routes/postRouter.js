import express from 'express'
import * as postController from '../controllers/postController'
import verifyToken from '../middleware/verifyToken'

const router = express.Router()

router.post('/create-post', verifyToken, postController.createPost)
router.get('/get-all-post', postController.getAllPost)
router.get('/get-one', postController.getPost)



export default router