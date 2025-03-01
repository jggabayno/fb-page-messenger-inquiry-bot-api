import express from 'express'
import { privateRoute } from '../../middleware/authMiddleware'
import { get, post, put } from '../../controllers/userController'

const router = express.Router()

router.get('/', get)
router.post('/', post)

router.route('/:id')
.get(get)
.put(put)

export default router