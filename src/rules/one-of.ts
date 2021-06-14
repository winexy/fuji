import type { Rule } from '../types'
import { createError } from '../utils'

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
    if (variants.indexOf(ctx.current) === -1) {
      ctx.errors.push(createError('one-of', msg, ctx, { variants }))
    }

    return ctx
  }
})
