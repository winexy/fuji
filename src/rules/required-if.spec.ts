import { random } from 'faker'
import { requiredIf } from './required-if'
import { Fuji } from '../types'
import { f, number, run } from '..'

describe('rules.required-if', () => {
  let schema: Fuji<{ a: Fuji<number>; b: Fuji<number> }>
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
