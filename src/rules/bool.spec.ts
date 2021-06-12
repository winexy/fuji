import { random } from 'faker'
import { bool } from './bool'
import { createContext } from '../utils'
import { VFunc } from '../types'
import { DEFAULT_CONFIG } from '../defaults'

describe('rules.bool', () => {
  let rule: VFunc<boolean>
  let msg = random.word()
  beforeEach(() => {
    rule = bool(msg)
  })

  it('should contain err message for invalid value', () => {
    // @ts-expect-error
    const { errors } = rule(createContext('test', DEFAULT_CONFIG))
    expect(errors[0]).toHaveProperty('message', msg)
  })

  it('should push error for invalid value', () => {
    // @ts-expect-error
    const { errors } = rule(createContext(42, DEFAULT_CONFIG))
    expect(errors).toBeArrayOfSize(1)
  })

  it('should contain err message for invalid value', () => {
    const { errors } = rule(createContext(false, DEFAULT_CONFIG))
    expect(errors).toBeEmpty()
  })
})
