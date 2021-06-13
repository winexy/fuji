import { required } from './required'
import { Fuji } from '../types'
import { f, run } from '..'

describe('rules.required', () => {
  let schema: Fuji<any>
  beforeEach(() => {
    schema = f(required('error'))
  })

  it('should push error for undefined value', () => {
    const { errors } = run(schema, undefined)
    expect(errors).toBeArrayOfSize(1)
  }) 

  it('should push provided message for invalid value', () => {
    const { errors } = run(schema, undefined)
    expect(errors![0]).toHaveProperty('message', 'error')
  })

  it('should not push error for non undefined value', () => {
    const { errors } = run(schema, 42)
    expect(errors).toBeNull()
  })
})
