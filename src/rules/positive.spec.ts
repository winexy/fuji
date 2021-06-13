import { random } from 'faker'
import { positive } from './positive'
import { Fuji } from '../types'
import { f, run } from '..'

describe('rules.positive', () => {
  let schema: Fuji<number>
  let msg = random.word()
  beforeEach(() => {
    schema = f(positive(msg))
  })

  it('should contain err message for invalid values', () => {
    const n = Math.abs(random.number()) * -1
    const { errors } = run(schema, n)
    expect(errors![0]).toHaveProperty('message', msg)
  })

  it('should push error if number is negative', () => {
    const n = Math.abs(random.number()) * -1
    const { errors } = run(schema, n)
    expect(errors).toBeArrayOfSize(1)
  })

  it('should not push error if number is positive', () => {
    const n = Math.abs(random.number())
    const { errors } = run(schema, n)
    expect(errors).toBeNull()
  })
})
