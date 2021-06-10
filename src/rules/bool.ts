import type { VFunc } from '../types'
import { createError } from '../utils'

export type BoolType = 'bool'

export const bool = (msg?: string): VFunc<boolean> =>
  function BoolV8N(ctx) {
    if (typeof ctx.current !== 'boolean') {
      ctx.errors.push(createError('bool', msg, ctx))
    }

    return ctx
  }
