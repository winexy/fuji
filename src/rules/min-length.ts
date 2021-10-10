import type { Rule } from '../types'
import { createError, isNil } from '../utils'

export type MinLengthType = 'min-length'

export type MinLengthMeta = {
  limit: number
}

type WithLength = { length: number }

export const minLength = <Value extends WithLength>(
  limit: number,
  msg?: string
): Rule<MinLengthType, Value> => ({
  type: 'min-length',
  canSkipCheck: true,
  func(ctx) {
    if (isNil(ctx.current.length) || ctx.current.length < limit) {
      ctx.errors.push(createError('min-length', msg, ctx, { limit }))
    }

    return ctx
  }
})
