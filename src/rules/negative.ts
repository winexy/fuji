import type { VFunc } from '../types'
import { createError } from '../utils'

export type NegativeType = 'negative'

export const negative = (msg?: string): VFunc<number> =>
  function PositiveV8N(ctx) {
    if (ctx.current >= 0) {
      ctx.errors.push(createError('negative', msg, ctx))
    }

    return ctx
  }
