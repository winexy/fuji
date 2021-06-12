import type { VFunc } from '../types'
import { createError } from '../utils'

export type MinLengthType = 'min-length'

export type MinLengthMeta = {
  limit: number
}

    if (ctx.current != null && ctx.current.length < limit) {
      ctx.errors.push(createError('min-length', msg, ctx, { limit }))
    }

    return ctx
  }
