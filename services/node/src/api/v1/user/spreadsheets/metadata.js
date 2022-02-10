import express from 'express'
import {
  getSpreadsheetsMetadata,
  updateSpreadsheetName,
  updateSpreadsheetFolder
} from './spreadsheetApi'

const router = express.Router()

router.get('/', async (req, res) => {
  const spreadsheets = await getSpreadsheetsMetadata(req.user.username)

  res.send({ spreadsheets })
})

router.put('/name/:id', async (req, res) => {
  const spreadsheet = await updateSpreadsheetName(
    req.params.id,
    req.user.username,
    req.body.name
  )

  res.send({ spreadsheet })
})

router.put('/folder/:id', async (req, res) => {
  const spreadsheet = await updateSpreadsheetFolder(
    req.params.id,
    req.body.folderId
  )

  res.send({ spreadsheet })
})

export default router
