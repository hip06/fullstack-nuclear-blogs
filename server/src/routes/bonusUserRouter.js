import express from 'express'
import * as bonusUserController from '../controllers/bonusUserController'
import verifyToken from '../middleware/verifyToken'

const router = express.Router()

router.put('/update-one', verifyToken, bonusUserController.updateBonusInfo)
router.get('/get-all', bonusUserController.getBonusInfos)



export default router