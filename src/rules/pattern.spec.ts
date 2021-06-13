import { pattern } from './pattern'
import { f, run } from '..'

describe('rules.pattern', () => {
  it('should return no error for valid pattern', () => {
    const schema = f(pattern(/hello world/))
    const value = 'hello world'

    const { errors } = run(schema, value)

    expect(errors).toBeNull()
  })

  it('should not push error if number is positive', () => {
    const schema = f(pattern(/hello world/))
    const value = 'hello there'

    const { errors } = run(schema, value)

    expect(errors).toBeArrayOfSize(1)
  })
})
