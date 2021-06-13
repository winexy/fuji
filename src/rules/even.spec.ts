import { f } from '..'
import { even } from './even'
import { run } from '../run'

describe('rules.even', () => {
  it.each`
    value
    ${1}
    ${43}
  `('when value=$value expected errors size is $expectedSize', ({ value }) => {
    const schema = f(even())

    const { errors } = run(schema, value)

    expect(errors).toBeArrayOfSize(1)
  })

  it.each`
    value
    ${2}
    ${42}
  `('when value=$value expected errors size is $expectedSize', ({ value }) => {
    const schema = f(even())

    const { errors } = run(schema, value)

    expect(errors).toBeNull()
  })
})
