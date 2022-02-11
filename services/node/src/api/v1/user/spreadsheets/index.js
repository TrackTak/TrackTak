import express from 'express'
import {
  createSpreadsheet,
  deleteSpreadsheet,
  getSpreadsheet,
  updateSpreadsheetData,
  updateSpreadsheetFolder
} from './spreadsheetApi'

const router = express.Router()

router.post('/', async (req, res) => {
  const spreadsheet = await createSpreadsheet(
    req.body.sheetData,
    req.user.username
  )

  await updateSpreadsheetFolder(spreadsheet._id, req.body.folderId)

  res.send({ spreadsheet })
})

router.patch('/data/:id', async (req, res) => {
  await updateSpreadsheetData(req.params.id, req.user.username, req.body.data)

  res.sendStatus(200)
})

router.get('/:id', async (req, res) => {
  const spreadsheet = await getSpreadsheet(req.params.id)

  res.send({ spreadsheet })
})

router.delete('/:id', async (req, res) => {
  await deleteSpreadsheet(req.params.id)

  res.sendStatus(200)
})

export default router
