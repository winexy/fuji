import { random } from 'faker'
import { fuji, run } from '..'
import { int } from './int'

describe('rules.int', () => {
  it.each`
    input
    ${random.word()}
    ${random.boolean()}
    ${random.float()}
  `('should return error when input=$input', ({ input }) => {
    const schema = fuji(int())

    const { errors } = run(schema, input)

    expect(errors).toBeArrayOfSize(1)
    expect(errors![0]).toEqual(
      expect.objectContaining({
        type: 'int',
        message: 'value should be type of int'
      })
    )
  })

  it('should not return error for int', () => {
    const schema = fuji(int())

    const { errors } = run(schema, random.number())

    expect(errors).toBeNull()
  })
})
