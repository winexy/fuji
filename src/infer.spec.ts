import { expectTypeOf } from 'expect-type'
import { defaultTo, f, run, string } from '.'

describe('Infer', () => {
  describe('defaultTo', () => {
    it('should infer to string', () => {
      const schema = f(string(), defaultTo('hello'))

      const result = run(schema, undefined)

      if (!result.invalid) {
        expectTypeOf(result.value).toEqualTypeOf<string>()
      }
    })

    it('should infer to optional string', () => {
      const schema = f(string())

      const result = run(schema, undefined)

      if (!result.invalid) {
        expectTypeOf(result.value).toEqualTypeOf<string | undefined>()
      }
    })

    it('should infer correctly object properties', () => {
      const schema = f.shape({
        is_important: f(string()),
        is_completed: f(string(), defaultTo('hello'))
      })

      const result = run(schema, 'whatever')

      if (!result.invalid) {
        expectTypeOf(result.value).toEqualTypeOf<{
          is_important?: string
          is_completed: string
        }>()
      }
    })
  })
})
