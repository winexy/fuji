import type { Rule } from '../types'
import { createError, isNumber } from '../utils'

export type NumberType = 'number'

export const number = (msg?: string): Rule<NumberType, number> => ({
  type: 'number',
  canSkipCheck: true,
  func(ctx) {
    if (!isNumber(ctx.current) || Number.isNaN(ctx.current)) {
      ctx.errors.push(createError('number', msg, ctx))
    }

    return ctx
  }
})
