import type { VFunc } from '../types'
import { createError } from '../utils'

export type NumericType = 'numeric'

export const numeric = <Value = unknown>(msg?: string): VFunc<Value> =>
  function NumericV8N(ctx) {
    // @ts-expect-error isNaN expects number ??wtf??
    if (isNaN(ctx.current)) {
      ctx.errors.push(createError('numeric', msg, ctx))
    }

    return ctx
  }
