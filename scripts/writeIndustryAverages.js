import 'dotenv/config'
import fs from 'fs'
import industryMapping from './data/industryMapping.json'
import gicSubIndustryMapping from './data/gicSubIndustryMapping.json'

const __dirname = new URL('.', import.meta.url).pathname

const writeIndustryAverages = () => {
  const inputIndustryAveragesUSPath = `${__dirname}data/industryAveragesUS.json`
  const inputIndustryAveragesGlobalPath = `${__dirname}data/industryAveragesGlobal.json`

  const industryAveragesUS = JSON.parse(
    fs.readFileSync(inputIndustryAveragesUSPath)
  )
  const industryAveragesGlobal = JSON.parse(
    fs.readFileSync(inputIndustryAveragesGlobalPath)
  )

  Object.entries(gicSubIndustryMapping).forEach(([key, value]) => {
    try {
      const industryAverageUS = industryAveragesUS.find(
        x => x.industryName === value
      )
      const industryAverageGlobal = industryAveragesGlobal.find(
        x => x.industryName === value
      )

      industryAverageUS.gicSubIndustry = key
      industryAverageGlobal.gicSubIndustry = key
    } catch (error) {
      console.log(`failed for key: ${key}`)
      throw error
    }
  })

  Object.entries(industryMapping).forEach(([key, value]) => {
    try {
      const industryAverageUS = industryAveragesUS.find(
        x => x.industryName === value
      )
      const industryAverageGlobal = industryAveragesGlobal.find(
        x => x.industryName === value
      )

      industryAverageUS.industry = key
      industryAverageGlobal.industry = key
    } catch (error) {
      console.log(`failed for key: ${key}`)
      throw error
    }
  })

  Object.values(industryAveragesUS).forEach(industryAverageUS => {
    industryAverageUS.industry =
      industryAverageUS.industry ?? industryAverageUS.industryName

    delete industryAverageUS.industryName
  })

  Object.values(industryAveragesGlobal).forEach(industryAverageGlobal => {
    industryAverageGlobal.industry =
      industryAverageGlobal.industry ?? industryAverageGlobal.industryName

    delete industryAverageGlobal.industryName
  })

  const sort = (a, b) => {
    if (a.industry.includes('Total Market')) {
      return 1
    }

    if (b.industry.includes('Total Market')) {
      return -1
    }

    return a.industry.localeCompare(b.industry)
  }

  industryAveragesUS.sort(sort)
  industryAveragesGlobal.sort(sort)

  const outputIndustryAveragesUSPath = `${__dirname}../services/node/src/api/v1/securities/stocks/industryAverages/US.json`
  const outputIndustryAveragesGlobalPath = `${__dirname}../services/node/src/api/v1/securities/stocks/industryAverages/global.json`

  fs.writeFileSync(
    outputIndustryAveragesUSPath,
    JSON.stringify(industryAveragesUS)
  )

  fs.writeFileSync(
    outputIndustryAveragesGlobalPath,
    JSON.stringify(industryAveragesGlobal)
  )

  process.exit(0)
}

writeIndustryAverages()