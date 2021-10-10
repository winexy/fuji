import type { Rule } from '../types'
import { createError, isNumber } from '../utils'

export type PositiveType = 'positive'

export const positive = (msg?: string): Rule<PositiveType, number> => ({
  type: 'positive',
  canSkipCheck: true,
  func(ctx) {
    if (!isNumber(ctx.current) || ctx.current < 0) {
      ctx.errors.push(createError('positive', msg, ctx))
    }

    return ctx
  }
})
