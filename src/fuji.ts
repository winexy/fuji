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

function fuji<V>(r1: VFunc<V>): Fuji<V>

function fuji<A, B, C>(r1: VFunc<A, B>, r2: VFunc<B, C>): Fuji<C>

function fuji<A, B, C, D>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>
): Fuji<D>

function fuji<A, B, C, D, E>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>
): Fuji<E>

function fuji<A, B, C, D, E, F>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>
): Fuji<F>

function fuji<A, B, C, D, E, F, G>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>
): Fuji<G>

function fuji<A, B, C, D, E, F, G, H>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>
): Fuji<H>

function fuji<A, B, C, D, E, F, G, H, I>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>
): Fuji<I>

function fuji<A, B, C, D, E, F, G, H, I, J>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>,
  r9: VFunc<I, J>
): Fuji<J>

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
