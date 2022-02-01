import express from 'express'
import spreadsheets from './spreadsheets'

const router = express.Router()

router.use('/spreadsheets', spreadsheets)

export default router
