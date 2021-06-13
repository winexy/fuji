import {
  even,
  f,
  run,
  includes,
  max,
  maxLength,
  minLength,
  number,
  numeric,
  pattern,
  positive,
  required,
  string
} from './index'
import { oneOf } from './rules/one-of'

test('string', () => {
  const schema = f(
    string(),
    minLength(3),
    maxLength(3),
    includes('A'),
    oneOf(['ALA', 'MAD']),
    pattern(/\w/),
    required()
  )

  const res = run(schema, 'ALA', {
    valueName: 'code'
  })

  expect(res).toBeEmpty()
})

test('number', () => {
  const schema = f(required(), number(), positive(), numeric(), even())

  const res = run(schema, 42, {
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
      const schema = f(number(), positive(), max(100))

      const errors = run(schema, 'not_a_number', {
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
      const schema = shape({
        price: f(number(), positive(), max(100)),
        login: f(string(), minLength(1))
      })

      const errors = run(
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
    const schema = shape({
      id: f(number(), positive()),
      nickname: f(string(), minLength(1))
    })

    const HOW_ABOUT = 'howAbout'
    const OR = 'or'

    const errors = run(schema, {
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
    const schema = f.shape({
      id: f(number(), positive()),
      nickname: f(string(), minLength(1))
    })

    const errors = run(
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
