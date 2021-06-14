import type { Rule } from '../types'
import { createError, isUndef } from '../utils'

export type RequiredIfType = 'required-if'

type Predicate = <Value>(root: any, value: Value) => boolean

export type RequiredIfMeta = {
  f: Predicate
}

export const requiredIf = <Value>(
  isRequired: Predicate,
  msg?: string
): Rule<RequiredIfType, Value> => ({
  type: 'required-if',
  func(ctx) {
    ctx.required = isRequired(ctx.root, ctx.current)

    if (ctx.required && isUndef(ctx.current)) {
      ctx.errors.push(createError('required-if', msg, ctx, { f: isRequired }))
    }

    return ctx
  }
})
