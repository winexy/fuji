import { array } from './array'
import { fuji, run } from '..'
import { random } from 'faker'

describe('rules.array', () => {
  it.each`
    input
    ${random.word()}
    ${random.number()}
    ${random.boolean()}
  `('when input=$input ', input => {
    const schema = fuji(array())

    const { errors } = run(schema, input)

    expect(errors).toBeArrayOfSize(1)
    expect(errors![0]).toEqual(
      expect.objectContaining({
        type: 'array',
        message: 'value should be type of array'
      })
    )
  })

  it.each`
    input
    ${[random.arrayElement()]}
    ${[]}
  `('should not return error', ({ input }) => {
    const schema = fuji(array())

    const { errors } = run(schema, input)

    expect(errors).toBeNull()
  })
})
