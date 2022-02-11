import { useCallback } from 'react'
import { api, useAuth } from '@tracktak/common'

const saveSpreadsheetData = async (spreadsheet, data, token) => {
  await api.updateSpreadsheetData(spreadsheet._id, data, token?.jwtToken)
}

const useSaveSpreadsheetData = spreadsheet => {
  const { getAccessToken } = useAuth()

  const saveSheetData = useCallback(
    async data => {
      const token = await getAccessToken()

      return saveSpreadsheetData(spreadsheet, data, token)
    },
    [getAccessToken, spreadsheet]
  )

  return saveSheetData
}

export default useSaveSpreadsheetData
