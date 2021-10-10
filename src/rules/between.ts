import type { Rule } from '../types'
import { createError } from '../utils'

export type BetweenType = 'between'

export type BetweenMeta = {
  left: number
  right: number
}

export const between = (
  left: number,

  right: number,

  msg?: string
): Rule<BetweenType, number> => ({
  type: 'between',
  canSkipCheck: true,
  func(ctx) {
    if (ctx.current < left || ctx.current > right) {
      ctx.errors.push(createError('between', msg, ctx, { left, right }))
    }

    return ctx
  }
})
