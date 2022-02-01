import express from 'express'
import { getSpreadsheet } from '../../user/spreadsheets/spreadsheetApi'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const spreadsheet = await getSpreadsheet(req.params.id)

  res.send({ spreadsheet })
})

export default router
