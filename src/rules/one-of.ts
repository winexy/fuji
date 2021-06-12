import type { VFunc } from '../types'
import { createError } from '../utils'

export type OneOfType = 'one-of'

export type OneOfMeta = {
  variants: any[]
}

    if (variants.indexOf(ctx.current) === -1) {
      ctx.errors.push(createError('one-of', msg, ctx, { variants }))
    }

    return ctx
  }
