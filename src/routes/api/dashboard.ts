import express from 'express'
import { get } from '../../controllers/dashboardController'
import { privateRoute } from '../../middleware/authMiddleware'

const router = express.Router()

router.get('/', privateRoute, get)

export default router