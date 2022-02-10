import express from 'express'
import {
  createSpreadsheet,
  deleteSpreadsheet,
  getSpreadsheet,
  updateSpreadsheet,
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

router.put('/', async (req, res) => {
  await updateSpreadsheet(req.body)

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
