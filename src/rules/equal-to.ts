import type { Rule } from '../types'
import { createError } from '../utils'

export type EqualToType = 'equal-to'

export type EqualToMeta = {
  target: any
}

export const equalTo = <T>(target: T, msg?: string): Rule<T> =>
  function EqualToV8N(ctx) {
    if (ctx.current !== target) {
      ctx.errors.push(createError('equal-to', msg, ctx, { target }))
    }

    return ctx
  }
