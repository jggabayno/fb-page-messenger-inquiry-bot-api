import express from 'express'
import { privateRoute } from '../../middleware/authMiddleware'
import { post } from '../../controllers/reEngageController'

const router = express.Router()

router.post('/', privateRoute, post)

export default router