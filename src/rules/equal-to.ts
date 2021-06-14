import type { Rule } from '../types'
import { createError } from '../utils'

export type EqualToType = 'equal-to'

export type EqualToMeta = {
  target: any
}

export const equalTo = <Value>(
  target: Value,
  msg?: string
): Rule<EqualToType, Value> => ({
  type: 'equal-to',
  func(ctx) {
    if (ctx.current !== target) {
      ctx.errors.push(createError('equal-to', msg, ctx, { target }))
    }

    return ctx
  }
})
