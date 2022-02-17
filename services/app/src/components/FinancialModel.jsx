import React from 'react'
import { Helmet } from 'react-helmet'
import { FinancialSpreadsheet } from '@tracktak/financial-model'
import useFetchSpreadsheet from '../hooks/useFetchSpreadsheet'
import { utils } from '@tracktak/common'
import useSaveSpreadsheetData from '../hooks/useSaveSpreadsheetData'
import { useParams } from 'react-router-dom'
import { useAuth } from '@tracktak/common'

const FinancialModel = () => {
  const params = useParams()
  const { userData } = useAuth()
  const spreadsheetData = useFetchSpreadsheet(params.sheetId)
  const saveSheetData = useSaveSpreadsheetData(spreadsheetData)
  const objectUserData = userData?.identities
    ? JSON.parse(userData.identities)
    : null

  const userIdentity = objectUserData
    ? objectUserData[0]?.providerName + '_' + objectUserData[0]?.userId
    : null

  const isCurrentUser = spreadsheetData?.userId === userIdentity

  return (
    <>
      {spreadsheetData?.sheetData.name && (
        <Helmet>
          <title>
            {utils.getTitle(`${spreadsheetData?.sheetData.name} Spreadsheet`)}
          </title>
        </Helmet>
      )}
      {spreadsheetData?.sheetData.data.sheets && (
        <FinancialSpreadsheet
          isReadOnly={!isCurrentUser}
          saveSheetData={saveSheetData}
          spreadsheetData={spreadsheetData}
          sx={{
            flex: 1
          }}
        />
      )}
    </>
  )
}

export default FinancialModel
