import type { Rule } from '../types'
import { createError } from '../utils'

type Predicate<T> = (current: T) => boolean

export interface CustomRuleI {
  Type: 'custom'
}

export type CustomRuleMeta = {
  f: Predicate<any>
}

export const use = <T>(
  rule: CustomRuleI['Type'],
  predicate: Predicate<T>,
  msg: string
): Rule<T> => {
  return function UseV8N(ctx) {
    if (!predicate(ctx.current)) {
      ctx.errors.push(createError(rule, msg, ctx, { f: predicate }))
    }

    return ctx
  }
}
