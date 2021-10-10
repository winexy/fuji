import { f } from './fuji'
import { string } from './rules/string'
import { minLength } from './rules/min-length'
import { maxLength } from './rules/max-length'
import { required, RequiredType } from './rules/required'
import { requiredIf, RequiredIfType } from './rules/required-if'
import { nullable, NullableType } from './rules/nullable'

describe('fuji', () => {
  it('should put "required" rule to first place', () => {
    const type: RequiredType = 'required'

    const { rules } = f(string(), minLength(3), maxLength(4), required())

    expect(rules[0].type).toBe(type)
  })

  it('should put "requiredIf" rule to first place', () => {
    const type: RequiredIfType = 'required-if'

    const { rules } = f(
      string(),
      minLength(3),
      maxLength(4),
      requiredIf(() => true)
    )

    expect(rules[0].type).toBe(type)
  })

  it('should put "nullable" rule to first place', () => {
    const type: NullableType = 'nullable'

    const { rules } = f(string(), minLength(3), maxLength(4), nullable())

    expect(rules[0].type).toBe(type)
  })

  it('should put "nullable" and "required" rules to the beginnig', () => {
    const nullableType: NullableType = 'nullable'
    const requiredType: RequiredType = 'required'

    const { rules } = f(
      string(),
      minLength(3),
      required(),
      maxLength(4),
      nullable()
    )

    expect(rules[0].type).toBe(nullableType)
    expect(rules[1].type).toBe(requiredType)
  })
})
