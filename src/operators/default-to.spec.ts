import { f, run, string } from '..'
import { defaultTo } from './default-to'

describe('operators.defaultTo', () => {
  it.each`
    input        | defaultValue
    ${undefined} | ${'hello'}
    ${''}        | ${'hello'}
  `(
    'when input=$input result should be default value',
    ({ input, defaultValue }) => {
      const schema = f(string(), defaultTo(defaultValue))

      const result = run(schema, input)

      expect(result.value).toBe(defaultValue)
    }
  )

  it.each`
    input    | defaultValue | expected
    ${'abc'} | ${'zxc'}     | ${'abc'}
    ${0}     | ${42}        | ${0}
  `(
    'when input=$input should ignore defaultValue',
    ({ input, defaultValue, expected }) => {
      const schema = f(defaultTo(defaultValue))

      const result = run(schema, input)

      expect(result.value).toBe(expected)
    }
  )
})
