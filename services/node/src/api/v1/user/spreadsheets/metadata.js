import express from 'express'
import {
  getSpreadsheetsMetadata,
  updateSpreadsheetName,
  updateSpreadsheetFolder,
  getSpreadsheet,
  getSpreadsheetsInFolder
} from './spreadsheetApi'

const router = express.Router()

router.get('/', async (req, res) => {
  const spreadsheets = await getSpreadsheetsMetadata(req.user.username)

  res.send({ spreadsheets })
})

router.put('/name/:id', async (req, res) => {
  console.log('id', req.params.id)
  console.log('user', req.user.username)
  console.log('req', req.body.name)
  await updateSpreadsheetName(req.params.id, req.user.username, req.body.name)

  const test = await getSpreadsheet(req.params.id)
  const p = await getSpreadsheetsInFolder(test.folderId)

  console.log('folders', p)
  console.log('spreadsheet', test)

  res.sendStatus(200)
})

router.put('/folder/:id', async (req, res) => {
  await updateSpreadsheetFolder(req.params.id, req.body.folderId)

  res.sendStatus(200)
})

export default router
