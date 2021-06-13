import { createContext } from '../utils'
import { fuji } from '../fuji'
import { arrayOf } from './array-of'
import { string } from './string'
import { maxLength } from './max-length'
import { minLength } from './min-length'
import { DEFAULT_CONFIG } from '../defaults'
import { expectTypeOf } from 'expect-type'
import { Rule } from '../types'

describe('rules.arrayOf', () => {
  it.each`
    value                | expectedSize
    ${[]}                | ${0}
    ${['MOW', 'ALA']}    | ${0}
    ${['TEST', 'VALUE']} | ${2}
  `(
    'when value=$value expected errors size is $expectedSize',
    ({ value, expectedSize }) => {
      const schema = arrayOf(fuji(string(), maxLength(3), minLength(3)))

      expectTypeOf(schema).toMatchTypeOf<Rule<string[]>>()

      const { errors } = schema(createContext(value, DEFAULT_CONFIG))

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )
})
