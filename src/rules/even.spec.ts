import { DEFAULT_CONFIG } from '../defaults'
import { createContext } from '../utils'
import { even } from './even'

describe('rules.even', () => {
  it.each`
    value | expectedSize
    ${1}  | ${1}
    ${2}  | ${0}
    ${42} | ${0}
    ${43} | ${1}
  `(
    'when value=$value expected errors size is $expectedSize',
    ({ value, expectedSize }) => {
      const rule = even()

      const { errors } = rule(createContext(value, DEFAULT_CONFIG))

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )
})
