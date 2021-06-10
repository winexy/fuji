import { random } from 'faker'
import { positive } from './positive'
import { createContext } from '../utils'
import { VFunc } from '../types'
import { DEFAULT_CONFIG } from '../fuji'

describe('rules.positive', () => {
  let rule: VFunc<number>
  let msg = random.word()
  beforeEach(() => {
    rule = positive(msg)
  })

  it('should contain err message for invalid values', () => {
    const n = Math.abs(random.number()) * -1
    const { errors } = rule(createContext(n, DEFAULT_CONFIG))
    expect(errors[0]).toHaveProperty('message', msg)
  })

  it('should push error if number is negative', () => {
    const n = Math.abs(random.number()) * -1
    const { errors } = rule(createContext(n, DEFAULT_CONFIG))
    expect(errors).toBeArrayOfSize(1)
  })

  it('should not push error if number is positive', () => {
    const n = Math.abs(random.number())
    const { errors } = rule(createContext(n, DEFAULT_CONFIG))
    expect(errors).toBeEmpty()
  })
})
