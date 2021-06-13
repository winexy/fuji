import { f, run } from '..'
import { odd } from './odd'

describe('rules.odd', () => {
  it.each`
    value
    ${1}
    ${43}
  `('when value=$value expected errors size is $expectedSize', ({ value }) => {
    const schema = f(odd())

    const { errors } = run(schema, value)

    expect(errors).toBeNull()
  })

  it.each`
    value
    ${2}
    ${42}
  `('when value=$value expected errors size is $expectedSize', ({ value }) => {
    const schema = f(odd())

    const { errors } = run(schema, value)

    expect(errors).toBeArrayOfSize(1)
  })
})
