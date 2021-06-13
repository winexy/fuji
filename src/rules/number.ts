import type { Rule } from '../types'
import { createError, isNumber, isUndef } from '../utils'

export type NumberType = 'number'

export const number = (msg?: string): Rule<number> =>
  function NumberV8N(ctx) {
    const shouldCheck = !isUndef(ctx.current) || ctx.required

    if (shouldCheck && (!isNumber(ctx.current) || Number.isNaN(ctx.current))) {
      ctx.errors.push(createError('number', msg, ctx))
    }

    return ctx
  }
