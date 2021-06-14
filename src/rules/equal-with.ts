import type { Rule } from '../types'
import { createError } from '../utils'

export type EqualWithType = 'equal-with'

type Extractor<Value> = (root: unknown) => Value

export type EqualWithMeta = {
  f: Extractor<any>
}

export const equalWith = <Value>(
  extractor: Extractor<Value>,
  msg?: string
): Rule<EqualWithType, Value> => ({
  type: 'equal-with',
  func(ctx) {
    if (extractor(ctx.root) !== ctx.current) {
      ctx.errors.push(createError('equal-with', msg, ctx, { f: extractor }))
    }

    return ctx
  }
})
