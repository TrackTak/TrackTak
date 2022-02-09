import express from 'express'
import auth from '../../../middleware/auth'
import plan from './plan'
import portalSession from './plan/portalSession'
import webhook from './plan/webhook'
import spreadsheets from './spreadsheets'
import spreadsheetsMetadata from './spreadsheets/metadata'
import folders from './folders'

const router = express.Router()

router.use('/plan/portal-session', auth, portalSession)
router.use('/plan/webhook', auth, webhook)
router.use('/plan', auth, plan)
router.use('/folders', auth, folders)
router.use('/spreadsheets/metadata', auth, spreadsheetsMetadata)
router.use('/spreadsheets', spreadsheets)

export default router
