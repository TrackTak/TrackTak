// TODO: Share with financial-model when issue fixed: https://github.com/parcel-bundler/parcel/issues/7437
export const incomeStatement = [
  { field: 'date' },
  { type: 'currency', field: 'revenue' },
  { type: 'currency', field: 'costOfRevenue' },
  { type: 'currency', field: 'grossProfit' },
  { type: 'percent', field: 'grossMargin' },
  { type: 'currency', field: 'sellingGeneralAdministrative' },
  { type: 'currency', field: 'sellingAndMarketingExpenses' },
  { type: 'currency', field: 'researchDevelopment' },
  { type: 'currency', field: 'effectOfAccountingCharges' },
  { type: 'currency', field: 'operatingExpenses' },
  { type: 'currency', field: 'operatingIncome' },
  { type: 'percent', field: 'operatingMargin' },
  { type: 'currency', field: 'interestIncome' },
  { type: 'currency', field: 'interestExpense' },
  { type: 'currency', field: 'netInterestIncome' },
  { type: 'currency', field: 'otherIncomeExpense' },
  { type: 'currency', field: 'incomeBeforeTax' },
  { type: 'currency', field: 'incomeTaxExpense' },
  { type: 'percent', field: 'effectiveTaxRate' },
  { type: 'currency', field: 'discontinuedOperations' },
  { type: 'currency', field: 'minorityInterest' },
  { type: 'currency', field: 'netIncomeFromContinuingOps' },
  { type: 'currency', field: 'netIncome' },
  { type: 'currency', field: 'preferredStockAndOtherAdjustments' },
  { type: 'currency', field: 'netIncomeApplicableToCommonShares' },
  { type: 'percent', field: 'netMargin' },
  { type: 'currency', field: 'ebit' },
  { type: 'currency', field: 'nonRecurring' },
  { type: 'currency', field: 'reconciledDepreciation' },
  { type: 'currency', field: 'otherItems' },
  { type: 'currency', field: 'ebitda' },
  { field: 'currencyCode' },
  { field: 'filingDate' }
]

export const balanceSheet = [
  { field: 'date' },
  { type: 'currency', field: 'cash' },
  { type: 'currency', field: 'shortTermInvestments' },
  { type: 'currency', field: 'cashAndShortTermInvestments' },
  { type: 'currency', field: 'netReceivables' },
  { type: 'currency', field: 'inventory' },
  { type: 'currency', field: 'otherCurrentAssets' },
  { type: 'currency', field: 'totalCurrentAssets' },
  { type: 'currency', field: 'longTermInvestments' },
  { type: 'currency', field: 'propertyPlantEquipment' },
  { type: 'currency', field: 'intangibleAssets' },
  { type: 'currency', field: 'goodWill' },
  { type: 'currency', field: 'otherAssets' },
  { type: 'currency', field: 'nonCurrentAssetsTotal' },
  { type: 'currency', field: 'totalAssets' },
  { type: 'currency', field: 'accountsPayable' },
  { type: 'currency', field: 'shortLongTermDebt' },
  { type: 'currency', field: 'otherCurrentLiab' },
  { type: 'currency', field: 'totalCurrentLiabilities' },
  { type: 'currency', field: 'longTermDebt' },
  { type: 'currency', field: 'capitalLeaseObligations' },
  { type: 'currency', field: 'longTermDebtAndCapitalLeases' },
  { type: 'currency', field: 'totalDebt' },
  { type: 'currency', field: 'deferredLongTermLiab' },
  { type: 'currency', field: 'nonCurrentLiabilitiesOther' },
  { type: 'currency', field: 'nonCurrentLiabilitiesTotal' },
  { type: 'currency', field: 'totalLiab' },
  { type: 'currency', field: 'commonStock' },
  { type: 'currency', field: 'preferredStockTotalEquity' },
  { type: 'currency', field: 'retainedEarnings' },
  { type: 'currency', field: 'accumulatedOtherComprehensiveIncome' },
  { type: 'currency', field: 'additionalPaidInCapital' },
  { type: 'currency', field: 'treasuryStock' },
  { type: 'currency', field: 'capitalSurpluse' },
  { type: 'currency', field: 'otherStockholderEquity' },
  { type: 'currency', field: 'totalStockholderEquity' },
  { type: 'currency', field: 'noncontrollingInterestInConsolidatedEntity' },
  { type: 'currency', field: 'totalEquity' },
  { field: 'currencyCode' },
  { field: 'filingDate' }
]

export const cashFlowStatement = [
  { field: 'date' },
  { type: 'currency', field: 'netIncome' },
  { type: 'currency', field: 'depreciation' },
  { type: 'currency', field: 'changeToAccountReceivables' },
  { type: 'currency', field: 'changeReceivables' },
  { type: 'currency', field: 'changeToInventory' },
  { type: 'currency', field: 'changeToLiabilities' },
  { type: 'currency', field: 'changeInWorkingCapital' },
  { type: 'currency', field: 'totalCashFromOperatingActivities' },
  { type: 'currency', field: 'investments' },
  { type: 'currency', field: 'otherCashflowsFromInvestingActivities' },
  { type: 'currency', field: 'totalCashflowsFromInvestingActivities' },
  { type: 'currency', field: 'salePurchaseOfStock' },
  { type: 'currency', field: 'netBorrowings' },
  { type: 'currency', field: 'dividendsPaid' },
  { type: 'currency', field: 'otherCashflowsFromFinancingActivities' },
  { type: 'currency', field: 'totalCashFromFinancingActivities' },
  { type: 'currency', field: 'beginPeriodCashFlow' },
  { type: 'currency', field: 'endPeriodCashFlow' },
  { type: 'currency', field: 'changeInCash' },
  { type: 'currency', field: 'capitalExpenditures' },
  { type: 'currency', field: 'freeCashFlow' },
  { field: 'currencyCode' },
  { field: 'filingDate' }
]

export const allStatements = [
  ...incomeStatement,
  ...balanceSheet,
  ...cashFlowStatement
]
