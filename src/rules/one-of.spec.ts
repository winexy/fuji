import { oneOf } from './one-of'
import { createContext } from '../utils'
import { DEFAULT_CONFIG } from '../defaults'

describe('rules.one-of', () => {
  it.each`
    variants           | value  | expectedSize
    ${[1, 2, 3]}       | ${2}   | ${0}
    ${[1, 2, 3]}       | ${10}  | ${1}
    ${['a', 'b', 'c']} | ${'c'} | ${0}
    ${['a', 'b', 'c']} | ${'F'} | ${1}
  `(
    'when variants=$variants and value=$value expected array size is $expectedSize',
    ({ variants, value, expectedSize }) => {
      const rule = oneOf(variants)

      const { errors } = rule(createContext(value, DEFAULT_CONFIG))

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )
})
