import { Router } from 'express'
import * as currentfavsCtrl from '../controllers/currentfavs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', currentfavsCtrl.index)
router.get('/:id', currentfavsCtrl.show)
router.get('/:id/edit', isLoggedIn, currentfavsCtrl.edit)
router.post('/', isLoggedIn, currentfavsCtrl.create)


export {
  router
}