import { FujiConfig } from './types'
import { shouldSkipCheck, createContext } from './utils'

describe('shouldSkipCheck', () => {
  it.each`
    value        | nullable | required | expected
    ${null}      | ${false} | ${true}  | ${false}
    ${null}      | ${true}  | ${true}  | ${true}
    ${undefined} | ${true}  | ${true}  | ${false}
    ${undefined} | ${true}  | ${false} | ${true}
  `(
    'should return $expected if value=$value and { nullable: $nullable, required: $required }',
    ({ value, nullable, required, expected }) => {
      const fujiConfig = {} as FujiConfig
      const context = createContext(value, fujiConfig, {
        nullable,
        required
      })

      const result = shouldSkipCheck(context)

      expect(result).toBe(expected)
    }
  )
})
