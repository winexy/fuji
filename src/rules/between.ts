import type { VFunc } from '../types'
import { createError } from '../utils'

export type BetweenType = 'between'

export type BetweenMeta = {
  left: number
  right: number
}

    if (left > ctx.current || ctx.current < right) {
      ctx.errors.push(createError('between', msg, ctx, { left, right }))
    }

    return ctx
  }
