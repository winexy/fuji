import { expectTypeOf } from 'expect-type'
import { f, Fuji, maxLength, required, string } from '..'
import { excludeRules } from './exclude-rules'

describe('excludeRules', () => {
  it('should return schema without excluded rules', () => {
    const rule1 = string()
    const rule2 = maxLength(255)
    const rule3 = required()

    const titleSchema = f(rule1, rule2, rule3)

    const result = excludeRules(titleSchema, ['required', 'max-length'])

    expect(result).toEqual(
      expect.objectContaining({
        rules: [rule1]
      })
    )
  })

  it('should match expected type', () => {
    const titleSchema = f(string(), maxLength(255), required())

    const result = excludeRules(titleSchema, ['required'])

    type ExpectedType = Fuji<'string' | 'max-length', string>

    expectTypeOf(result).toMatchTypeOf<ExpectedType>()
  })
})
