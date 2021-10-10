import type { Rule } from '../types'
import { createError, isBool } from '../utils'

export type BoolType = 'bool'

export const bool = (msg?: string): Rule<BoolType, boolean> => ({
  type: 'bool',
  canSkipCheck: true,
  func(ctx) {
    if (!isBool(ctx.current)) {
      ctx.errors.push(createError('bool', msg, ctx))
    }

    return ctx
  }
})
