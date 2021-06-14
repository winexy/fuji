import type { Rule } from '../types'
import { createError } from '../utils'

type Predicate<T> = (current: T) => boolean

export interface CustomRuleI {
  Type: 'use'
}

export type CustomRuleMeta = {
  f: Predicate<any>
}

export const use = <T>(
  rule: CustomRuleI['Type'],
  predicate: Predicate<T>,
  msg: string
): Rule<'use', T> => ({
  type: 'use',
  func(ctx) {
    if (!predicate(ctx.current)) {
      ctx.errors.push(createError(rule, msg, ctx, { f: predicate }))
    }

    return ctx
  }
})
