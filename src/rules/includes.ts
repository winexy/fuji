import type { VFunc } from '../types'
import { createError } from '../utils'

export type IncludesType = 'includes'

export type IncludesMeta = {
  target: any
}

  msg?: string
): VFunc<{ indexOf: (x: T) => number }> =>
  function IncludesV8N(ctx) {
    if (typeof ctx.current?.indexOf !== 'function') {
      ctx.errors.push(createError('unsupported-type', msg, ctx, { target }))
      return ctx
    }

    if (ctx.current.indexOf(target) === -1) {
      ctx.errors.push(createError('includes', msg, ctx, { target }))
    }

    return ctx
  }
