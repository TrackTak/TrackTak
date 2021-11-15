import { useCallback } from 'react'
import { api, useAuth } from '@tracktak/common'

const saveSpreadsheetData = async (spreadsheet, newData, token) => {
  await api.saveSpreadsheet(
    {
      ...spreadsheet,
      sheetData: {
        ...spreadsheet.sheetData,
        data: newData
      }
    },
    token?.jwtToken
  )
}

const useSaveSpreadsheetData = spreadsheet => {
  const { getAccessToken } = useAuth()

  const saveSheetData = useCallback(
    async newData => {
      const token = await getAccessToken()

      return saveSpreadsheetData(spreadsheet, newData, token)
    },
    [getAccessToken, spreadsheet]
  )

  return saveSheetData
}

export default useSaveSpreadsheetData