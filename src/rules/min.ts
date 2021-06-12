import type { VFunc } from '../types'
import { createError } from '../utils'

export type MinType = 'min'

export type MinMeta = {
  limit: number
}

export const min = (limit: number, msg?: string): VFunc<number> =>
  function MinV8N(ctx) {
    if (ctx.current < limit) {
      ctx.errors.push(createError('min', msg, ctx, { limit }))
    }

    return ctx
  }
