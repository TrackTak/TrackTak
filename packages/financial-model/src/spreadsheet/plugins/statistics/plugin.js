import { StatisticalPlugin } from '@tracktak/hyperformula/es/interpreter/plugin/StatisticalPlugin'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import {
  normal,
  lognormal
} from '@tracktak/hyperformula/es/interpreter/plugin/3rdparty/jstat/jstat'

export const implementedFunctions = {
  'STATISTICS.NORMAL_INVERSE_RANDOM': {
    method: 'normalInverseRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER, greaterThan: 0 }
    ]
  },
  'STATISTICS.UNIFORM_INVERSE_RANDOM': {
    method: 'uniformInverseRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER }
    ]
  },
  'STATISTICS.TRIANGULAR_INVERSE_RANDOM': {
    method: 'triangularInverseRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
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
  'STATISTICS.LOGNORMAL_INVERSE_RANDOM': {
    method: 'lognormalInverseRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER, greaterThan: 0 }
    ]
  }
}

export const aliases = {
  'S.NIR': 'STATISTICS.NORMAL_INVERSE_RANDOM',
  'S.UIR': 'STATISTICS.UNIFORM_INVERSE_RANDOM',
  'S.TIR': 'STATISTICS.TRIANGULAR_INVERSE_RANDOM',
  'S.LIR': 'STATISTICS.LOGNORMAL_INVERSE_RANDOM'
}

export const translations = {
  enGB: aliases
}

export class Plugin extends StatisticalPlugin {
  normalInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.NORMAL_INVERSE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (mean, standardDeviation) => {
        const normalInvValue = normal.inv(
          Math.random(),
          mean,
          standardDeviation
        )

        return normalInvValue
      }
    )
  }

  uniformInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.UNIFORM_INVERSE_RANDOM')

    return this.runFunction(ast.args, state, metadata, (min, max) => {
      const uniformDistFormula = (random, min, max) => {
        return min + random * (max - min)
      }

      const uniformInvDistValue = uniformDistFormula(
        Math.random(),
        Math.min(min),
        Math.min(max)
      )

      return uniformInvDistValue
    })
  }

  triangularInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.TRIANGULAR_INVERSE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (min, mostLikely, max) => {
        const triangularInvFormula = (random, lowerLimit, mode, upperLimit) => {
          const lowerRange = mode - lowerLimit
          const totalRange = upperLimit - lowerLimit

          if (
            mode <= lowerLimit ||
            upperLimit < lowerLimit ||
            upperLimit > mode
          ) {
            return NaN
          } else {
            if (random <= totalRange / lowerRange) {
              return (
                lowerLimit +
                lowerRange * Math.sqrt(random * (totalRange / lowerRange))
              )
            } else {
              return (
                lowerLimit +
                lowerRange *
                  (1 - Math.sqrt((1 - random) * (1 - totalRange / lowerRange)))
              )
            }
          }
        }

        const triangularInvValue = triangularInvFormula(
          Math.random(),
          min,
          mostLikely,
          max
        )

        return triangularInvValue
      }
    )
  }

  lognormalInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.LOGNORMAL_INVERSE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (mean, standardDeviation) => {
        const lognormalInvValue = lognormal.inv(
          Math.random(),
          mean,
          standardDeviation
        )

        return lognormalInvValue
      }
    )
  }

  statisticsSize() {
    return new ArraySize(1, 1)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
