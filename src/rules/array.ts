import type { Rule } from '../types'
import { createError, isUndef } from '../utils'

export type ArrayType = 'array'

export const array = (msg?: string): Rule<any[]> => {
  return function ArrayV8N(ctx) {
    if (!isUndef(ctx.current) && !Array.isArray(ctx.current)) {
      ctx.errors.push(createError('array', msg, ctx))
    }

    return ctx
  }
}
