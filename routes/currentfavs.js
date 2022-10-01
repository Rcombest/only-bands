import { Router } from 'express'
import * as currentfavsCtrl from '../controllers/currentfavs.js'

const router = Router()

router.get('/', currentfavsCtrl.index)

export {
  router
}