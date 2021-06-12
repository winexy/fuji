import type { VFunc } from '../types'
import { createError } from '../utils'

export type MaxType = 'max'

export type MaxMeta = {
  limit: number
}

export const max = (limit: number, msg?: string): VFunc<number> =>
  function MaxV8N(ctx) {
    if (ctx.current > limit) {
      ctx.errors.push(createError('max', msg, ctx, { limit }))
    }

    return ctx
  }
