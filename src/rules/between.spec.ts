import { fuji, run } from '..'
import { between } from './between'
import { required } from './required'

describe('rules.between', () => {
  it.each`
    left | right | input
    ${1} | ${4}  | ${-1}
    ${1} | ${4}  | ${0}
    ${1} | ${4}  | ${5}
    ${1} | ${4}  | ${6}
  `(
    'should return error when left=$left right=$right input=$input',
    ({ left, right, input }) => {
      const schema = fuji(between(left, right))

      const errors = run(schema, input)

      expect(errors).toBeArrayOfSize(1)
      expect(errors[0]).toEqual(
        expect.objectContaining({
          type: 'between',
          message: `value should be in between ${left} and ${right}`
        })
      )
    }
  )

  it.each`
    left | right | input
    ${1} | ${4}  | ${1}
    ${1} | ${4}  | ${2}
    ${1} | ${4}  | ${3}
    ${1} | ${4}  | ${4}
  `(
    'should not return error when left=$left right=$right input=$input',
    ({ left, right, input }) => {
      const schema = fuji(between(left, right))

      const errors = run(schema, input)

      expect(errors).toBeEmpty()
    }
  )

  it('should not return error if value is not required', () => {
    const schema = fuji(between(1, 100))

    const errors = run(schema, undefined)

    expect(errors).toBeEmpty()
  })

  it('should return error if value is required', () => {
    const schema = fuji(between(1, 100), required())

    const errors = run(schema, undefined)

    expect(errors).toBeArrayOfSize(1)
  })
})
