import { f } from '..'
import { numeric } from './numeric'
import { run } from '../run'

describe('rules.numeric', () => {
  it.each`
    value
    ${42}
    ${'42'}
  `('when value=$value expected errors size is $expectedSize', ({ value }) => {
    const schema = f(numeric())

    const { errors } = run(schema, value)

    expect(errors).toBeNull()
  })

  it.each`
    value
    ${'test'}
    ${'42test'}
  `('when value=$value expected errors size is $expectedSize', ({ value }) => {
    const schema = f(numeric())

    const { errors } = run(schema, value)

    expect(errors).toBeArrayOfSize(1)
  })
})
