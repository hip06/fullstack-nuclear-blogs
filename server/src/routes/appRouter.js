import express from 'express'
import * as appController from '../controllers/appController'

const router = express.Router()

router.get('/get-all-specialization', appController.getAllSpec)
router.get('/get-all-role', appController.getAllRole)
router.get('/get-all-position', appController.getAllPosition)

export default router