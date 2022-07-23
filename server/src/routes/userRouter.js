import express from 'express'
import * as userontroller from '../controllers/userController'
import verifyToken from '../middleware/verifyToken'

const router = express.Router()

router.get('/get-one', verifyToken, userontroller.getOneUser)
router.get('/get-one-by-userId', userontroller.getOneUserById)
router.get('/get-all', verifyToken, userontroller.getAllUser)
router.put('/update', verifyToken, userontroller.updateUser)
router.put('/update-by-admin', verifyToken, userontroller.updateUserByAdmin)
router.delete('/delete', verifyToken, userontroller.deleteUser)


export default router