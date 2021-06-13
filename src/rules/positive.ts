import type { VFunc } from '../types'
import { createError, isNumber } from '../utils'

export type PositiveType = 'positive'

export const positive = (msg?: string): VFunc<number> => {
  return function PositiveV8N(ctx) {
    if (!isNumber(ctx.current) || ctx.current < 0) {
      ctx.errors.push(createError('positive', msg, ctx))
    }

    return ctx
  }
}
