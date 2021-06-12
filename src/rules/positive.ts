import type { VFunc } from '../types'
import { createError } from '../utils'

export type PositiveType = 'positive'

export const positive = (msg?: string): VFunc<number> => {
  return function PositiveV8N(ctx) {
    if (ctx.current < 0) {
      ctx.errors.push(createError('positive', msg, ctx))
    }

    return ctx
  }
}
