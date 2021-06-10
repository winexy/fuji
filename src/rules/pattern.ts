import type { VFunc } from '../types'
import { createError } from '../utils'

export type PatternType = 'pattern'

export const pattern = (regex: RegExp, msg?: string): VFunc<string> =>
  function PatternV8N(ctx) {
    if (!regex.test(ctx.current)) {
      ctx.errors.push(createError('pattern', msg, ctx, { regex }))
    }

    return ctx
  }
