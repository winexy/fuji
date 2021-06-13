import type { VFunc } from '../types'
import { createError, isUndef } from '../utils'

export type BetweenType = 'between'

export type BetweenMeta = {
  left: number
  right: number
}

export const between = (left: number, right: number, msg?: string): VFunc<number> => {
  return function BetweenV8N(ctx) {
    const shouldCheck = ctx.required || !isUndef(ctx.current)

    if (shouldCheck && (ctx.current < left || ctx.current > right)) {
      ctx.errors.push(createError('between', msg, ctx, { left, right }))
    }

    return ctx
  }
}
