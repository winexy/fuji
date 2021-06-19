import type { Rule } from '../types'
import { createError, isUndef } from '../utils'

export type OneOfType = 'one-of'

export type OneOfMeta = {
  variants: any[]
}

export const oneOf = <Value>(
  variants: Value[],
  msg?: string
): Rule<OneOfType, Value> => ({
  type: 'one-of',
  func(ctx) {
    const shouldCheck = ctx.required || !isUndef(ctx.current)

    if (shouldCheck && variants.indexOf(ctx.current) === -1) {
      ctx.errors.push(createError('one-of', msg, ctx, { variants }))
    }

    return ctx
  }
})
