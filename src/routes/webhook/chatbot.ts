import express from 'express'
import { get, post } from '../../controllers/chatbotController'

const router = express.Router()

router.route('/').get(get).post(post)

export default router