import { DEFAULT_CONFIG } from '../defaults'
import { createContext } from '../utils'
import { odd } from './odd'

describe('rules.odd', () => {
  it.each`
    value | expectedSize
    ${1}  | ${0}
    ${2}  | ${1}
    ${42} | ${1}
    ${43} | ${0}
  `(
    'when value=$value expected errors size is $expectedSize',
    ({ value, expectedSize }) => {
      const rule = odd()

      const { errors } = rule(createContext(value, DEFAULT_CONFIG))

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )
})
