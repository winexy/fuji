import { random } from 'faker'
import { requiredIf, RequiredIfType } from './required-if'
import { Fuji } from '../types'
import { f, number, run } from '..'
import { ShapeType } from './shape'
import { NumberType } from './number'

describe('rules.required-if', () => {
  let schema: Fuji<
    ShapeType,
    { a: Fuji<NumberType, number>; b: Fuji<RequiredIfType, number> }
  >
  let msg = random.word()

  beforeEach(() => {
    schema = f.shape({
      a: f(number()),
      b: f(requiredIf(root => root?.a === 42, msg))
    })
  })

  it('should return provided error message for invalid value', () => {
    const { errors } = run(schema, { a: 42 })

    expect(errors![0]).toHaveProperty('message', msg)
  })

  it('should push errors for true predicate', () => {
    const { errors } = run(schema, { a: 42 })

    expect(errors).toBeArrayOfSize(1)
  })

  it('should not push error for false predicate', () => {
    const { errors } = run(schema, { a: 1 })

    expect(errors).toBeNull()
  })
})
