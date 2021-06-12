import type { VFunc } from '../types'
import { createError } from '../utils'

export type MaxLengthType = 'max-length'

export type MaxLengthMeta = {
  limit: number
}

    if (ctx.current != null && ctx.current.length > limit) {
      ctx.errors.push(createError('max-length', msg, ctx, { limit }))
    }

    return ctx
  }
