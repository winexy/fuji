import type { Rule } from '../types'
import { createError, isFunc } from '../utils'

export type IncludesType = 'includes'

export type IncludesMeta = {
  target: any
}

type WithIndexOf<T> = { indexOf(arg: T): number }

export const includes = <Value extends WithIndexOf<Value>>(
  target: Value,
  msg?: string
): Rule<IncludesType, Value> => ({
  type: 'includes',
  canSkipCheck: true,
  func(ctx) {
    if (!isFunc(ctx.current?.indexOf)) {
      ctx.errors.push(createError('unsupported-type', msg, ctx))
      return ctx
    }

    if (ctx.current.indexOf(target) === -1) {
      ctx.errors.push(createError('includes', msg, ctx, { target }))
    }

    return ctx
  }
})
