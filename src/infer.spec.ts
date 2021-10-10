import { expectTypeOf } from 'expect-type'
import { defaultTo, f, nullable, run, string, required } from '.'

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

  describe('nullable', () => {
    it('should infer required & nullable', () => {
      const schema = f.shape({
        property: f(string(), nullable(), required())
      })

      const result = run(schema, undefined)

      if (!result.invalid) {
        expectTypeOf(result.value.property).toEqualTypeOf<string | null>()
      }
    })

    it('should infer non nullable required property', () => {
      const schema = f.shape({
        property: f(string(), required())
      })

      const result = run(schema, undefined)

      if (!result.invalid) {
        expectTypeOf(result.value.property).toEqualTypeOf<string>()
      }
    })

    it('should infer nullable & optional', () => {
      const schema = f.shape({
        property: f(string(), nullable())
      })

      const result = run(schema, undefined)

      if (!result.invalid) {
        expectTypeOf(result.value.property).toEqualTypeOf<
          string | null | undefined
        >()
      }
    })
  })
})
