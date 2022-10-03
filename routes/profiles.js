import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.get('/bands/:bandID/edit/:id', isLoggedIn, profilesCtrl.edit)
router.post('/:id/bands', isLoggedIn, profilesCtrl.createBand)
router.put("/:profileId/bands/:bandId", isLoggedIn, profilesCtrl.update)
router.delete('/bands/:id', isLoggedIn, profilesCtrl.deleteBand)

export {
  router
}