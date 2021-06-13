import type { Rule } from '../types'
import { createError, isNumber } from '../utils'

export type MaxType = 'max'

export type MaxMeta = {
  limit: number
}

export const max = (limit: number, msg?: string): Rule<number> =>
  function MaxV8N(ctx) {
    if (!isNumber(ctx.current) || ctx.current > limit) {
      ctx.errors.push(createError('max', msg, ctx, { limit }))
    }

    return ctx
  }
