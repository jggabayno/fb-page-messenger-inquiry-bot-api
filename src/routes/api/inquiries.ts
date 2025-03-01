import express from 'express'
import { 
    privateRoute
} from '../../middleware/authMiddleware'
import { 
    getById,
    getByPlatformId,
    get, post, put,
    getByUserId 
} from '../../controllers/inquiryController'

const router = express.Router()

router.get('/', get)
router.post('/', post)

router.route('/:id')
.get(getById)
.put(put)

router.get('/platform/:id', getByPlatformId)
router.get('/user/:user_id', getByUserId)


export default router