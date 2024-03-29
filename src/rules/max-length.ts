import type { Rule } from '../types'
import { createError } from '../utils'

export type MaxLengthType = 'max-length'

export type MaxLengthMeta = {
  limit: number
}

type WithLength = { length: number }

export const maxLength = <Value extends WithLength>(
  limit: number,
  msg?: string
): Rule<MaxLengthType, Value> => ({
  type: 'max-length',
  canSkipCheck: true,
  func(ctx) {
    if (ctx.current != null && ctx.current.length > limit) {
      ctx.errors.push(createError('max-length', msg, ctx, { limit }))
    }

    return ctx
  }
})
