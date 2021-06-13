import type { Rule } from '../types'
import { createError } from '../utils'

export type IntType = 'int'

export const int = (msg?: string): Rule<number> =>
  function IntV8N(ctx) {
    if (!Number.isInteger(ctx.current)) {
      ctx.errors.push(createError('int', msg, ctx))
    }

    return ctx
  }
