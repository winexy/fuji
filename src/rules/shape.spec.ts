import { shape, ShapeType } from './shape'
import { string, StringType } from './string'
import { expectTypeOf } from 'expect-type'
import { Fuji } from '../types'
import { required } from './required'
import { number } from './number'
import { f, run } from '..'

describe('shape', () => {
  it('should match type', () => {
    const schema = f(
      shape({
        name: f(string())
      })
    )

    type ExpectedType = Fuji<
      ShapeType,
      {
        name: Fuji<StringType, string>
      }
    >

    expectTypeOf(schema).toMatchTypeOf<ExpectedType>()
  })

  it('should caught errors for deeply nested object', () => {
    const schema = f(
      shape({
        user: f(
          shape({
            id: f(required(), number()),
            city: f(
              shape({
                name: f(string())
              })
            )
          })
        )
      })
    )

    const { errors } = run(schema, {
      user: {
        city: {
          name: 42
        }
      }
    })

    const cityNameError = expect.objectContaining({
      type: 'string',
      message: '"user.city.name" should be type of string',
      path: 'user.city.name'
    })

    const idError = expect.objectContaining({
      type: 'required',
      message: '"user.id" is required',
      path: 'user.id'
    })

    const idError2 = expect.objectContaining({
      type: 'number',
      message: '"user.id" should be type of number',
      path: 'user.id'
    })

    expect(errors).toEqual(
      expect.arrayContaining([cityNameError, idError, idError2])
    )
  })

  it('should return no errors for deeply neseted object', () => {
    const schema = f(
      shape({
        user: f(
          shape({
            id: f(required(), number()),
            city: f(
              shape({
                name: f(string())
              })
            )
          })
        )
      })
    )

    const { errors } = run(schema, {
      user: {
        city: {
          name: 'LA'
        },
        id: 42
      }
    })

    expect(errors).toBeNull()
  })

  it('should return no errors for optional fields', () => {
    const schema = f(
      shape({
        optional: f(string())
      })
    )

    const { errors } = run(schema, {})

    expect(errors).toBeNull()
  })

  it.each`
    input
    ${'not_an_object'}
    ${42}
    ${[]}
    ${true}
  `('should return shape-mismatch for input=$input', ({ input }) => {
    const schema = f(
      shape({
        a: f(string()),
        b: f(number())
      })
    )

    const { errors } = run(schema, input)

    expect(errors).toBeArrayOfSize(1)
    expect(errors![0]).toEqual(
      expect.objectContaining({
        type: 'shape-mismatch',
        message: 'value has invalid shape. Missing keys: a, b',
        meta: {
          keys: ['a', 'b']
        }
      })
    )
  })

  it.each`
    input
    ${'not_an_object'}
    ${42}
    ${[]}
    ${true}
  `('should return shape-mismatch for input=$input', ({ input }) => {
    const schema = f(
      shape({
        object: f(
          shape({
            a: f(string()),
            b: f(number())
          })
        )
      })
    )

    const { errors } = run(schema, { object: input })

    expect(errors).toBeArrayOfSize(1)
    expect(errors![0]).toEqual(
      expect.objectContaining({
        type: 'shape-mismatch',
        message: '"object" has invalid shape. Missing keys: a, b',
        path: 'object',
        meta: {
          keys: ['a', 'b']
        }
      })
    )
  })
})
