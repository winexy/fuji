import type { VFunc } from '../types'
import { createError } from '../utils'

export type EqualWithType = 'equal-with'

type Extractor<Value> = (root: unknown) => Value

export type EqualWithMeta = {
  f: Extractor<any>
}

  function EqualWithV8N(ctx) {
    if (f(ctx.root) !== ctx.current) {
      ctx.errors.push(createError('equal-with', msg, ctx, { f }))
    }

    return ctx
  }
