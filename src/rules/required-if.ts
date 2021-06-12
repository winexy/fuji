import type { VFunc } from '../types'
import { createError, isUndef } from '../utils'

export type RequiredIfType = 'required-if'

type Predicate = <Value>(root: any, value: Value) => boolean

export type RequiredIfMeta = {
  f: Predicate
}

export const RequiredIfName = 'RequiredIfV8N'

export const requiredIf = <Value>(
  isRequired: Predicate,
  msg?: string
): VFunc<Value> => {
  return function RequiredIfV8N(ctx) {
    ctx.required = isRequired(ctx.root, ctx.current)

    if (ctx.required && isUndef(ctx.current)) {
      ctx.errors.push(createError('required-if', msg, ctx, { f: isRequired }))
    }

    return ctx
  }
}