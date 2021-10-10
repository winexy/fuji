import type { Rule } from '../types'

export type NullableType = 'nullable'

export const nullable = <Value extends any = any>(): Rule<
  NullableType,
  Value
> => ({
  type: 'nullable',
  func(ctx) {
    ctx.nullable = true
    return ctx
  }
})
