import { arrayOf } from './array-of'
import { string } from './string'
import { maxLength } from './max-length'
import { minLength } from './min-length'
import { expectTypeOf } from 'expect-type'
import { Fuji } from '../types'
import { f, run } from '..'

describe('rules.arrayOf', () => {
  it.each`
    input
    ${[]}
    ${['MOW', 'ALA']}
  `('should return null errors when input=$input', ({ input }) => {
    const schema = f(arrayOf(f(string(), maxLength(3), minLength(3))))

    const { errors } = run(schema, input)

    expect(errors).toBeNull()
  })

  it('should return errors for every invalid item', () => {
    const schema = f(arrayOf(f(string(), maxLength(3), minLength(3))))
    const input = ['TEST', 'VALUE']

    const { errors } = run(schema, input)

    expect(errors).toEqual([
      expect.objectContaining({
        type: 'max-length',
      }),
      expect.objectContaining({
        type: 'max-length'
      })
    ])
  })

  it('should match inferred type', () => {
    const schema = f.array(f(string()))

    expectTypeOf(schema).toMatchTypeOf<Fuji<string[]>>()
  })
})
