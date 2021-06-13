import type { Rule } from '../types'
import { createError } from '../utils'

export type OddType = 'odd'

export const odd = (msg?: string): Rule<number> => {
  return function OddV8N(ctx) {
    if (ctx.current % 2 === 0) {
      ctx.errors.push(createError('odd', msg, ctx))
    }

    return ctx
  }
}
