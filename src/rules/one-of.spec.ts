import { f, run } from '..'
import { oneOf } from './one-of'

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
})
