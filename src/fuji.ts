import type { VContext, VFunc, VError, Fuji } from './types'
import { createContext } from './utils'
import { ErrorType, ErrContext } from './types'

export function validate<T>(schema: Fuji<T>, context: VContext): VContext {
  // prettier-ignore
  return schema.rules.reduce(
    (ctx, f) => f(ctx), context
  );
}

export type FujiConfig = {
  failFast: boolean
  allowUnknown: boolean
  dict: Record<ErrorType, (context: ErrContext) => string>
}

const stub = () => 'todo: stub'

export const DEFAULT_DICT: FujiConfig['dict'] = {
  string: ctx => `${ctx.joinedPath} should be type of string`,
  bool: ctx => `${ctx.joinedPath} should be type of bool`,
  includes: ctx => `${ctx.joinedPath} should include ${ctx.meta.target}`,
  ['unsupported-type']: ctx => `${ctx.joinedPath} has unsupported type`,
  required: ctx => `${ctx.joinedPath} is required`,
  'required-if': ctx => `${ctx.joinedPath} is required`,
  'one-of': ctx => 'todo: one-of',
  positive: ctx => `${ctx.joinedPath} should be positive`,
  custom: ctx => 'todo custom',
  number: stub,
  object: stub,
  array: stub,
  'equal-to': stub,
  'equal-with': stub,
  between: stub,
  even: stub,
  'instance-of': stub,
  max: stub,
  min: stub,
  'max-length': stub,
  int: stub,
  'min-length': stub,
  negative: stub,
  odd: stub,
  pattern: stub,
  numeric: stub
}

function fuji<Value>(...rules: VFunc<Value>[]): Fuji<Value> {
  return { rules: sortRules(rules) }
}

const highPriority = [RequiredName, RequiredIfName]

function sortRules<Value>(rules: VFunc<Value>[]): VFunc<Value>[] {
  return rules.sort((rule1, rule2) => {
    if (highPriority.includes(rule1.name)) {
      return -1
    } else if (highPriority.includes(rule2.name)) {
      return 1
    }

    return 0
  })
}

export { fuji, runWith }
