import { SimpleRangeValue } from '@tracktak/hyperformula'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import { isNil } from 'lodash'
import { noValueReturnedCellError } from './cellErrors'

// TODO: Could this be in hyperformula automatically?
export const inferSizeMethod = ast => {
  if (!ast.asyncPromise?.getIsResolvedValue()) {
    return ArraySize.error()
  }

  return ast.asyncPromise.resolvedValue.size ?? ArraySize.scalar()
}

const getFixedSimpleRangeValues = values => {
  // TODO: If has one length then HF is throwing errors.
  // Raise with HF as this seems to be a bug.
  return values.length === 1
    ? values[0]
    : Array.isArray(values[0])
    ? SimpleRangeValue.onlyValues(values)
    : SimpleRangeValue.onlyValues([values])
}

export const getPluginAsyncValue = value => {
  if (isNil(value)) {
    return noValueReturnedCellError
  }

  if (Array.isArray(value)) {
    return getFixedSimpleRangeValues(value)
  }

  return value
}

export const timeToNumber = time => {
  return ((time.seconds / 60 + time.minutes) / 60 + time.hours) / 24
}
