import type { Rule } from '../types'
import { createError, isBool, isUndef } from '../utils'

export type BoolType = 'bool'

export const bool = (msg?: string): Rule<boolean> => {
  return function BoolV8N(ctx) {
    const shouldCheck = !isUndef(ctx.current) || ctx.required

    if (shouldCheck && !isBool(ctx.current)) {
      ctx.errors.push(createError('bool', msg, ctx))
    }

    return ctx
  }
}
