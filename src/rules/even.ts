import { createError } from '../utils'
import { Rule } from '../types'

export type EvenType = 'even'

export const even = (msg?: string): Rule<EvenType, number> => ({
  type: 'even',
  func(ctx) {
    if (ctx.current % 2 === 1) {
      ctx.errors.push(createError('even', msg, ctx))
    }

    return ctx
  }
})
