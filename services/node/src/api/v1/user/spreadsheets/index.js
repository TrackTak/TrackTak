import express from 'express'
import {
  createSpreadsheet,
  deleteSpreadsheet,
  getSpreadsheet,
  updateSpreadsheet,
  updateSpreadsheetFolder
} from './spreadsheetApi'
import decodeVerifyJwt from '../../../../security/decodeVerifyJwt'
import auth from '../../../../middleware/auth'

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const spreadsheet = await createSpreadsheet(
    req.body.sheetData,
    req.user.username
  )

  await updateSpreadsheetFolder(
    spreadsheet._id,
    req.user.username,
    req.body.folderId
  )

  res.send({ spreadsheet })
})

// TODO: This route should be /:id and we should remove the put method underneath
router.put('/', auth, async (req, res) => {
  const spreadsheet = await updateSpreadsheet(req.body, req.user.username)

  res.send({ spreadsheet })
})

router.put('/:id', auth, async (req, res) => {
  const spreadsheet = await updateSpreadsheetFolder(
    req.params.id,
    req.user.username,
    req.body.folderId
  )

  res.send({ spreadsheet })
})

router.get('/:id', async (req, res, next) => {
  const spreadsheet = await getSpreadsheet(req.params.id)

  if (spreadsheet.globalPublicEntitlements?.isPublic) {
    res.send({ spreadsheet })
    return next()
  }

  const userDetails = await decodeVerifyJwt(req)

  if (!userDetails.isValid || spreadsheet.userId !== userDetails.username) {
    res.sendStatus(401)
    return next()
  }

  res.send({ spreadsheet })
})

router.delete('/:id', auth, async (req, res) => {
  await deleteSpreadsheet(req.params.id, req.user.username)

  res.send({ id: req.params.id })
})

export default router
