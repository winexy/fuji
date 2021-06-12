import { fuji } from './fuji'
import { string } from './rules/string'
import { minLength } from './rules/min-length'
import { maxLength } from './rules/max-length'
import { required, RequiredName } from './rules/required'
import { requiredIf, RequiredIfName } from './rules/required-if'

describe('fuji', () => {
  it('should put "required" rule to first place', () => {
    const { rules } = fuji(string(), minLength(3), maxLength(4), required())

    expect(rules[0].name).toBe(RequiredName)
  })

  it('should put "requiredIf" rule to first place', () => {
    const { rules } = fuji(
      string(),
      minLength(3),
      maxLength(4),
      requiredIf(() => true)
    )

    expect(rules[0].name).toBe(RequiredIfName)
  })
})
