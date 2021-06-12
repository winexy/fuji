import type { VFunc } from '../types'
import { createError } from '../utils'

export type BetweenType = 'between'

export type BetweenMeta = {
  left: number
  right: number
}

export const between = (left: number, right: number, msg?: string): VFunc<number> => {
  return function BetweenV8N(ctx) {
    if (left > ctx.current || ctx.current < right) {
      ctx.errors.push(createError('between', msg, ctx, { left, right }))
    }

    return ctx
  }
}
