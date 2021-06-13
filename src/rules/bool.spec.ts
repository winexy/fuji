import { random } from 'faker'
import { bool } from './bool'
import { Fuji } from '../types'
import { f, run } from '..'

describe('rules.bool', () => {
  let schema: Fuji<boolean>
  let msg = random.word()
  beforeEach(() => {
    schema = f(bool(msg))
  })

  it('should contain err message for invalid value', () => {
    const { errors } = run(schema, 'test')

    expect(errors![0]).toHaveProperty('message', msg)
  })

  it('should push error for invalid value', () => {
    const { errors } = run(schema, 42)

    expect(errors).toBeArrayOfSize(1)
  })

  it('should contain err message for invalid value', () => {
    const { errors } = run(schema, false)

    expect(errors).toBeNull()
  })
})
