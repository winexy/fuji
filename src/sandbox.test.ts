import {
  even,
  f,
  run,
  includes,
  maxLength,
  minLength,
  number,
  numeric,
  pattern,
  positive,
  required,
  string,
  oneOf
} from './index'

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

  const { errors } = run(schema, 'ALA', {
    valueName: 'code'
  })

  expect(errors).toBeNull()
})

test('number', () => {
  const schema = f(required(), number(), positive(), numeric(), even())

  const { errors } = run(schema, 42, {
    valueName: 'number'
  })

  expect(errors).toBeNull()
})
