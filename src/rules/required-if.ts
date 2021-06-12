import type { RequiredIfPredicate, VFunc } from '../types'
import { createError, isUndef } from '../utils'

export type RequiredIfType = 'required-if'

type Predicate = <Value>(root: any, value: Value) => boolean

export type RequiredIfMeta = {
  f: Predicate
}

  msg?: string
): VFunc<T> =>
  function RequiredIfV8N(ctx) {
    if (predicate(ctx.root, ctx.current) && isUndef(ctx.current)) {
      ctx.errors.push(createError('required-if', msg, ctx, { f: predicate }))
    }

    return ctx
  }
