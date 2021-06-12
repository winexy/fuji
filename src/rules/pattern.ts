import type { VFunc } from '../types'
import { createError } from '../utils'

export type PatternType = 'pattern'

export type PatternMeta = {
  regex: RegExp
}

    if (!regex.test(ctx.current)) {
      ctx.errors.push(createError('pattern', msg, ctx, { regex }))
    }

    return ctx
  }
