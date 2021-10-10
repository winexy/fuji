import type { Rule } from '../types'
import { createError, isUndef } from '../utils'

export type ArrayType = 'array'

export const array = (msg?: string): Rule<'array', any[]> => ({
  type: 'array',
  canSkipCheck: true,
  func(ctx) {
    if (!isUndef(ctx.current) && !Array.isArray(ctx.current)) {
      ctx.errors.push(createError('array', msg, ctx))
    }

    return ctx
  }
})
