import type { VFunc } from '../types'
import { createError, isNil } from '../utils'

export type MinLengthType = 'min-length'

export type MinLengthMeta = {
  limit: number
}

type WithLength = { length: number }

export const minLength = <Value extends WithLength>(
  limit: number,
  msg?: string
): VFunc<Value> => {
  return function MinLenV8N(ctx) {
    const shouldCheck = ctx.required || !isNil(ctx.current)

    if (
      shouldCheck &&
      (isNil(ctx.current.length) || ctx.current.length < limit)
    ) {
      ctx.errors.push(createError('min-length', msg, ctx, { limit }))
    }

    return ctx
  }
}
