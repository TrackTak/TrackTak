import express from 'express'

const router = express.Router()

// router.get('/:id', async (req, res) => {
//   const spreadsheet = await getGlobalSharedSpreadsheet(
//     req.params.id,
//     req.params.username
//   )

//   if (spreadsheet.globalPublicEntitlements?.isPublic) {
//     res.send({ spreadsheet })
//   }

//   res.send(null)
// })

export default router
