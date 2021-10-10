import type { Rule } from '../types'
import { createError } from '../utils'

export type PatternType = 'pattern'

export type PatternMeta = {
  regex: RegExp
}

export const pattern = (
  regex: RegExp,
  msg?: string
): Rule<PatternType, string> => ({
  type: 'pattern',
  canSkipCheck: true,
  func(ctx) {
    if (!regex.test(ctx.current)) {
      ctx.errors.push(createError('pattern', msg, ctx, { regex }))
    }

    return ctx
  }
})
