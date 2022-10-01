import { Router } from 'express'
import * as currentfavsCtrl from '../controllers/currentfavs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', currentfavsCtrl.index)
router.post('/', isLoggedIn, currentfavsCtrl.create)

export {
  router
}