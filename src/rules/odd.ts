import type { Rule } from '../types'
import { createError } from '../utils'

export type OddType = 'odd'

export const odd = (msg?: string): Rule<OddType, number> => ({
  type: 'odd',
  func(ctx) {
    if (ctx.current % 2 === 0) {
      ctx.errors.push(createError('odd', msg, ctx))
    }

    return ctx
  }
})
