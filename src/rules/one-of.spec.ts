import { f, run } from '..'
import { oneOf } from './one-of'
import { required } from './required'

describe('rules.one-of', () => {
  it.each`
    variants           | value
    ${[1, 2, 3]}       | ${2}
    ${['a', 'b', 'c']} | ${'c'}
  `(
    'when variants=$variants and value=$value expected array size is $expectedSize',
    ({ variants, value }) => {
      const schema = f(oneOf(variants))

      const { errors } = run(schema, value)

      expect(errors).toBeNull()
    }
  )

  it.each`
    variants           | value
    ${[1, 2, 3]}       | ${10}
    ${['a', 'b', 'c']} | ${'F'}
  `(
    'when variants=$variants and value=$value expected array size is $expectedSize',
    ({ variants, value }) => {
      const schema = f(oneOf(variants))

      const { errors } = run(schema, value)

      expect(errors).toBeArrayOfSize(1)
    }
  )

  it('should skip check if value is not required', () => {
    const schema = f(oneOf([1, 2]))

    const { errors } = run(schema, undefined)

    expect(errors).toBeNull()
  })

  it('should not skip check if value is required', () => {
    const schema = f(oneOf([1, 2]), required())

    const { errors } = run(schema, undefined)

    expect(errors).toBeArrayOfSize(2)
  })

  it('should not skip check if value is optional but non undefined value was provided', () => {
    const schema = f(oneOf([1, 2]))

    const { errors } = run(schema, 'test')

    expect(errors).toBeArrayOfSize(1)
  })
})
