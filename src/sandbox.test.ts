import * as F from './index'

test('string', () => {
  const schema = F.fuji(
    F.string(),
    F.minLength(3),
    F.maxLength(3),
    F.includes('A'),
    F.oneOf(['ALA', 'MAD']),
    F.pattern(/\w/),
    F.required()
  )

  const res = F.runWith(schema, 'ALA', {
    valueName: 'code'
  })

  expect(res).toBeEmpty()
})

test('number', () => {
  const schema = F.fuji(
    F.required(),
    F.number(),
    F.positive(),
    F.numeric(),
    F.even()
  )

  const res = F.runWith(schema, 42, {
    valueName: 'number'
  })

  expect(res).toBeEmpty()
})

describe('failFast', () => {
  test.each`
    failFast | expectedSize
    ${true}  | ${1}
    ${false} | ${3}
  `(
    'when failFast=$failFast expected errors size $expectedSize',
    ({ failFast, expectedSize }) => {
      const schema = F.fuji(F.number(), F.positive(), F.max(100))

      const errors = F.runWith(schema, 'not_a_number', {
        failFast
      })

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )

  test.each`
    failFast | expectedSize
    ${true}  | ${1}
    ${false} | ${5}
  `(
    'when failFast=$failFast expected errors size $expectedSize',
    ({ failFast, expectedSize }) => {
      const schema = F.fuji(
        F.shape({
          price: F.fuji(F.number(), F.positive(), F.max(100)),
          login: F.fuji(F.string(), F.minLength(1))
        })
      )

      const errors = F.runWith(
        schema,
        {
          price: 'login',
          login: 42
        },
        {
          failFast
        }
      )

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )
})

describe('allowUnknown', () => {
  test('should forbid unknown properties', () => {
    const schema = F.fuji(
      F.shape({
        id: F.fuji(F.number(), F.positive()),
        nickname: F.fuji(F.string(), F.minLength(1))
      })
    )

    const HOW_ABOUT = 'howAbout'
    const OR = 'or'

    const errors = F.runWith(schema, {
      id: 4,
      nickname: 'winexy',
      [HOW_ABOUT]: 'that?',
      [OR]: 'that?'
    })

    expect(errors).toBeArrayOfSize(2)
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'unknown-key',
          meta: { key: HOW_ABOUT },
          message: `value has unknown key: ${HOW_ABOUT}`
        }),
        expect.objectContaining({
          type: 'unknown-key',
          meta: { key: OR },
          message: `value has unknown key: ${OR}`
        })
      ])
    )
  })

  it('should allow uknown properties', () => {
    const schema = F.fuji(
      F.shape({
        id: F.fuji(F.number(), F.positive()),
        nickname: F.fuji(F.string(), F.minLength(1))
      })
    )

    const errors = F.runWith(
      schema,
      {
        id: 4,
        nickname: 'winexy',
        howAbout: 'that?',
        or: 'that?'
      },
      {
        allowUnknown: true
      }
    )

    expect(errors).toBeEmpty()
  })
})
