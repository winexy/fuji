import { random } from 'faker'
import { string } from './string'
import { Fuji } from '../types'
import { f, run } from '..'

describe('rules.string', () => {
  let schema: Fuji<string>
  let msg = random.word()
  beforeEach(() => {
    schema = f(string(msg))
  }) 

  it('should push provided message for invalid value', () => {
    const { errors } = run(schema, {})
    expect(errors![0]).toHaveProperty('message', msg)
  })

  it('should push error for number', () => {
    const { errors } = run(schema, 42)
    expect(errors).toBeArrayOfSize(1)
  })

  it('should push error for boolean', () => {
    const { errors } = run(schema, false)
    expect(errors).toBeArrayOfSize(1)
  })

  it('should push error for array', () => {
    const { errors } = run(schema, [])
    expect(errors).toBeArrayOfSize(1)
  })

  it('should not push error for string type', () => {
    const res = run(schema, 'hello')
    expect(res.errors).toBeNull()
  })
})
