import { pattern } from './pattern'
import { createContext } from '../utils'
import { DEFAULT_CONFIG } from '../defaults'

describe('rules.pattern', () => {
  it('should return no error for valid pattern', () => {
    const rule = pattern(/hello world/)
    const value = 'hello world'

    const { errors } = rule(createContext(value, DEFAULT_CONFIG))

    expect(errors).toBeEmpty()
  })

  it('should not push error if number is positive', () => {
    const rule = pattern(/hello world/)
    const value = 'hello there'

    const { errors } = rule(createContext(value, DEFAULT_CONFIG))

    expect(errors).toBeArrayOfSize(1)
  })
})
