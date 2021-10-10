import type { Rule } from '../types'
import { createError } from '../utils'

export type MinType = 'min'

export type MinMeta = {
  limit: number
}

export const min = (
  limit: number,

  msg?: string
): Rule<MinType, number> => ({
  type: 'min',
  canSkipCheck: true,
  func(ctx) {
    if (ctx.current < limit) {
      ctx.errors.push(createError('min', msg, ctx, { limit }))
    }

    return ctx
  }
})
