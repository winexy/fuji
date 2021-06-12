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
