import type { VFunc } from '../types'
import { createError } from '../utils'

export type MinLengthType = 'min-length'

export const minLength = <T>(limit: number, msg?: string): VFunc<T[]> =>
  function MinLenV8N(ctx) {
    if (ctx.current != null && ctx.current.length < limit) {
      ctx.errors.push(createError('min-length', msg, ctx, { limit }))
    }

    return ctx
  }
