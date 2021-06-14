import type { Rule } from '../types'
import { createError } from '../utils'

export type NumericType = 'numeric'

export const numeric = <Value = unknown>(msg?: string): Rule<NumericType, Value> => ({
  type: 'numeric',
  func(ctx) {
    // @ts-expect-error isNaN expects number ??wtf??
    if (isNaN(ctx.current)) {
      ctx.errors.push(createError('numeric', msg, ctx))
    }

    return ctx
  }
})
