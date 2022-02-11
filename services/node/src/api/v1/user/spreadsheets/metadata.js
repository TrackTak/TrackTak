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

router.patch('/name/:id', async (req, res) => {
  await updateSpreadsheetName(req.params.id, req.user.username, req.body.name)

  res.sendStatus(200)
})

router.patch('/folder/:id', async (req, res) => {
  await updateSpreadsheetFolder(req.params.id, req.body.folderId)

  res.sendStatus(200)
})

export default router
