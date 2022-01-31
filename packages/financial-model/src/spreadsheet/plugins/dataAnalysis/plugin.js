import {
  FunctionPlugin,
  HyperFormula,
  SimpleRangeValue
} from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import {
  xMaxValueCellError,
  xMinValueCellError,
  yMaxValueCellError,
  yMinValueCellError,
  varAssumptionValuesCellError
} from './cellErrors'
import truncateDecimal from '../../shared/truncateDecimal'
import { config, namedExpressions } from '../../hyperformulaConfig'
import {
  mean,
  stdev,
  variance,
  percentile
} from '@tracktak/hyperformula/es/interpreter/plugin/3rdparty/jstat/jstat'
import {
  confidenceIntervalFormula,
  kurtosisFormula,
  medianFormula,
  skewnessFormula
} from '../../../statsFormulas'
import { isSimpleCellAddress } from '@tracktak/hyperformula/es/Cell'

export const standardizedMoment = (arr, n) => {
  const mu = mean(arr)
  const sigma = stdev(arr)
  const length = arr.length
  let skewSum = 0

  for (let i = 0; i < length; i++) skewSum += Math.pow((arr[i] - mu) / sigma, n)

  return skewSum / arr.length
}

export const coefficientOfVariationFormula = arrVector => {
  return stdev(arrVector) / mean(arrVector)
}

export const stDevErrorOfMeanFormula = arr => {
  return stdev(arr) / Math.sqrt(arr.length)
}

export const getConfidenceInterval = arr => {
  return confidenceIntervalFormula(stDevErrorOfMeanFormula(arr), 1.96)
}

const getLowerUpperHalves = (midPoint, minPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint

  const truncateLowerHalfPoint = truncateDecimal(lowerHalfPoint, 2)
  const truncateUpperHalfPoint = truncateDecimal(upperHalfPoint, 2)

  return { truncateLowerHalfPoint, truncateUpperHalfPoint }
}

export const implementedFunctions = {
  'DATA_ANALYSIS.SENSITIVITY_ANALYSIS': {
    method: 'sensitivityAnalysis',
    arraySizeMethod: 'dataAnalysisSensitivitySize',
    inferReturnType: true,
    isAsyncMethod: true,
    parameters: [
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      }
    ]
  },
  'DATA_ANALYSIS.MONTE_CARLO_SIMULATION': {
    method: 'monteCarloSimulation',
    arraySizeMethod: 'dataAnalysisMonteCarloSize',
    parameters: [
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.RANGE
      },
      {
        argumentType: ArgumentTypes.NUMBER,
        greaterThan: 0,
        defaultValue: 10000
      }
    ]
  }
}

export const translations = {
  enGB: {
    'DATA_ANALYSIS.SENSITIVITY_ANALYSIS': 'DATA_ANALYSIS.SENSITIVITY_ANALYSIS',
    'DATA_ANALYSIS.MONTE_CARLO_SIMULATION':
      'DATA_ANALYSIS.MONTE_CARLO_SIMULATION'
  }
}

export const getPlugin = getPowersheet => {
  class Plugin extends FunctionPlugin {
    sensitivityAnalysis(ast, state) {
      const powersheet = getPowersheet()
      const hyperformula = powersheet.hyperformula
      const metadata = this.metadata('DATA_ANALYSIS.SENSITIVITY_ANALYSIS')

      const intersectionCellReference =
        ast.args[0].reference.toSimpleCellAddress(state.formulaAddress)

      const xVarCellReference = ast.args[1].reference.toSimpleCellAddress(
        state.formulaAddress
      )

      const yVarCellReference = ast.args[2].reference.toSimpleCellAddress(
        state.formulaAddress
      )

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (_, xVar, yVar, xMin, xMax, yMin, yMax) => {
          const isXMinValid = xVar > xMin
          const isXMaxValid = xVar < xMax

          if (!isXMinValid) {
            return xMinValueCellError
          }

          if (!isXMaxValid) {
            return xMaxValueCellError
          }

          const isYMinValid = yVar > yMin
          const isYMaxValid = yVar < yMax

          if (!isYMinValid) {
            return yMinValueCellError
          }

          if (!isYMaxValid) {
            return yMaxValueCellError
          }

          const xLowerUpper = getLowerUpperHalves(xVar, xMin)
          const yLowerUpper = getLowerUpperHalves(yVar, yMin)

          const xRangeValues = [
            xMin,
            xLowerUpper.truncateLowerHalfPoint,
            xVar,
            xLowerUpper.truncateUpperHalfPoint,
            xMax
          ]
          const yRangeValues = [
            yMin,
            yLowerUpper.truncateLowerHalfPoint,
            yVar,
            yLowerUpper.truncateUpperHalfPoint,
            yMax
          ]

          const cellPrecedents = hyperformula.getAllCellPrecedents(
            state.formulaAddress
          )

          const [hfInstance, promise] = HyperFormula.buildEmpty(
            config,
            namedExpressions
          )

          await promise

          const sheetNames = hyperformula.getSheetNames()

          sheetNames.forEach(sheetName => {
            const sheetId = hyperformula.getSheetId(sheetName)
            const sheetMetadata = hyperformula.getSheetMetadata(sheetId)

            hfInstance.addSheet(sheetName, sheetMetadata)
          })

          await hfInstance.batch(() => {
            cellPrecedents.forEach(address => {
              if (isSimpleCellAddress(address)) {
                const cell = hyperformula.getCellSerialized(address)

                // Stops namedExpressions being set
                if (address.sheet >= 0) {
                  hfInstance.setCellContents(address, cell)
                }
              }
            })
          })[1]

          const allPromises = []

          for (const xValue of xRangeValues) {
            const xPromise = hfInstance.setCellContents(xVarCellReference, {
              cellValue: xValue
            })[1]

            const rowPromise = new Promise((resolve, reject) => {
              const promises = yRangeValues.map(yValue => {
                const yPromise = hfInstance.setCellContents(yVarCellReference, {
                  cellValue: yValue
                })[1]

                const valuePromise = new Promise((resolve, reject) => {
                  Promise.all([xPromise, yPromise])
                    .then(() => {
                      const intersectionPointValue = hfInstance.getCellValue(
                        intersectionCellReference
                      ).cellValue

                      resolve(intersectionPointValue)
                    })
                    .catch(reject)
                })

                return valuePromise
              })

              Promise.all(promises).then(resolve).catch(reject)
            })

            allPromises.push(rowPromise)
          }

          const intersectionPointValues = await Promise.all(allPromises)

          intersectionPointValues.unshift(xRangeValues)
          intersectionPointValues[0].unshift('')
          intersectionPointValues.forEach((arr, i) => {
            if (i !== 0) {
              arr.unshift(yRangeValues[i - 1])
            }
          })

          return SimpleRangeValue.onlyValues(intersectionPointValues)
        }
      )
    }

    monteCarloSimulation(ast, state) {
      const metadata = this.metadata('DATA_ANALYSIS.MONTE_CARLO_SIMULATION')

      const intersectionCellAddress = ast.args[0].reference.toSimpleCellAddress(
        state.formulaAddress
      )

      const varAssumptionCellAddresses = ast.args[1].args.map(arr => {
        return arr.map(({ reference }) =>
          reference.toSimpleCellAddress(state.formulaAddress)
        )
      })[0]

      return this.runFunction(
        ast.args,
        state,
        metadata,
        (_, varAssumption, iteration) => {
          const sheets = this.serialization.getAllSheetsSerialized()
          HyperFormula.unregisterFunction(
            'DATA_ANALYSIS.MONTE_CARLO_SIMULATION'
          )

          const hfInstance = HyperFormula.buildFromSheets(
            sheets,
            config,
            namedExpressions
          )[0]

          const varAssumptionData = varAssumption.rawData()

          const isVarAssumptionValid = varAssumptionData.length === 1

          if (!isVarAssumptionValid) {
            return varAssumptionValuesCellError
          }

          const output = []

          for (let i = 1; i <= iteration; i++) {
            varAssumptionCellAddresses.forEach(cellAddress => {
              const cellValue = hfInstance.getCellFormula(cellAddress).cellValue

              hfInstance.setCellContents(cellAddress, { cellValue })
            })

            const intersectionValue = hfInstance.dependencyGraph.getScalarValue(
              intersectionCellAddress
            ).cellValue

            output.push(intersectionValue)
          }

          const n = 11
          const percentiles = Array.from(
            Array(n),
            (_, number) => number / 10
          ).map(percent => {
            return [percent * 100 + '%', percentile(output, percent, false)]
          })

          const trialsOutput = output.length
          const meanOutput = mean(output)
          const medianOutput = medianFormula(output)
          const min = Math.min(...output)
          const max = Math.max(...output)
          const stddevOutput = stdev(output)
          const varianceOutput = variance(output)
          const skewnessOutput = skewnessFormula(output)
          const kurtosisOutput = kurtosisFormula(output)
          const coefficientOfVariationOutput =
            coefficientOfVariationFormula(output)
          const stDevErrorOfMeanOutput = stDevErrorOfMeanFormula(output)
          const upperLimitOutput = mean(output) + getConfidenceInterval(output)
          const lowerLimitOutput = mean(output) - getConfidenceInterval(output)

          hfInstance.destroy()

          HyperFormula.registerFunction(
            'DATA_ANALYSIS.MONTE_CARLO_SIMULATION',
            Plugin
          )

          return SimpleRangeValue.onlyValues([
            ['Statistic', 'Forecast values'],
            ['Trials', trialsOutput],
            ['Mean', meanOutput],
            ['Median', medianOutput],
            ['Minimum', min],
            ['Maximum', max],
            ['Standard Deviation', stddevOutput],
            ['Variance', varianceOutput],
            ['Skewness', skewnessOutput],
            ['Kurtosis', kurtosisOutput],
            ['Coeff. of Variation', coefficientOfVariationOutput],
            ['Mean Standard Error', stDevErrorOfMeanOutput],
            ['@95% Upper Limit', upperLimitOutput],
            ['@95% Lower Limit', lowerLimitOutput],
            [''],
            ['Percentile', 'Forecast values'],
            ...percentiles
          ])
        }
      )
    }

    dataAnalysisSensitivitySize() {
      return new ArraySize(7, 7)
    }

    dataAnalysisMonteCarloSize() {
      return new ArraySize(27, 27)
    }
  }

  Plugin.implementedFunctions = implementedFunctions

  return Plugin
}
