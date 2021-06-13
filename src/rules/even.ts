import type { Rule } from '../types'
import { createError } from '../utils'

export type EvenType = 'even'

export const even = (msg?: string): Rule<number> => {
  return function EvenV8N(ctx) {
    if (ctx.current % 2 === 1) {
      ctx.errors.push(createError('even', msg, ctx))
    }

    return ctx
  }
}
