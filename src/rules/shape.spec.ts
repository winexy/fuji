import { fuji, runWith } from '../fuji'
import { shape } from './shape'
import { string } from './string'
import { expectTypeOf } from 'expect-type'
import { Fuji } from '../types'
import { required } from './required'
import { number } from './number'

describe('shape', () => {
  it('should match type', () => {
    const schema = fuji(
      shape({
        name: fuji(string())
      })
    )

    type ExpectedType = Fuji<{
      name: Fuji<string>
    }>

    expectTypeOf(schema).toMatchTypeOf<ExpectedType>()
  })

  it('should caught errors for deeply nested object', () => {
    const schema = fuji(
      shape({
        user: fuji(
          shape({
            id: fuji(required(), number()),
            city: fuji(
              shape({
                name: fuji(string())
              })
            )
          })
        )
      })
    )

    const res = runWith(schema, {
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

    expect(res).toEqual(
      expect.arrayContaining([cityNameError, idError, idError2])
    )
  })

  it('should return no errors for deeply neseted object', () => {
    const schema = fuji(
      shape({
        user: fuji(
          shape({
            id: fuji(required(), number()),
            city: fuji(
              shape({
                name: fuji(string())
              })
            )
          })
        )
      })
    )

    const errors = runWith(schema, {
      user: {
        city: {
          name: 'LA'
        },
        id: 42
      }
    })

    expect(errors).toBeEmpty()
  })

  it('should return no errors for optional fields', () => {
    const schema = fuji(
      shape({
        optional: fuji(string())
      })
    )

    const errors = runWith(schema, {})

    expect(errors).toBeEmpty()
  })
})