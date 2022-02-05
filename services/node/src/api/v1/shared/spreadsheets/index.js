import express from 'express'
import { getGlobalSharedSpreadsheet } from '../../user/spreadsheets/spreadsheetApi'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const spreadsheet = await getGlobalSharedSpreadsheet(req.params.id)

  if (spreadsheet.globalPublicEntitlements?.isPublic) {
    res.send({ spreadsheet })
  }

  res.send(null)
})

export default router
