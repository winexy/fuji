import { DEFAULT_CONFIG } from '../defaults'
import { createContext } from '../utils'
import { numeric } from './numeric'

describe('rules.numeric', () => {
  it.each`
    value       | expectedSize
    ${42}       | ${0}
    ${'42'}     | ${0}
    ${'test'}   | ${1}
    ${'42test'} | ${1}
  `(
    'when value=$value expected errors size is $expectedSize',
    ({ value, expectedSize }) => {
      const rule = numeric()

      const { errors } = rule(createContext(value, DEFAULT_CONFIG))

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )
})
