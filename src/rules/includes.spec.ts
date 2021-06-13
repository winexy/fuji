import { random } from 'faker'
import { includes } from './includes'
import { f, run } from '..'

describe('rules.includes', () => {
  it('should contain err message for invalid value', () => {
    const msg = random.word()
    const schema = f(includes('the', msg))

    const { errors } = run(schema, 'text')

    expect(errors![0]).toHaveProperty('message', msg)
  })

  it('should push error for invalid value', () => {
    const schema = f(includes('uni'))

    const { errors } = run(schema, 'verse')

    expect(errors).toBeArrayOfSize(1)
  })

  it('should push error for invalid value', () => {
    const schema = f(includes('uni'))

    const { errors } = run(schema, 'universe')

    expect(errors).toBeNull()
  })
})
