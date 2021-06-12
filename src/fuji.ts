import { DEFAULT_CONFIG } from './defaults'
import { RequiredName } from './rules/required'
import { RequiredIfName } from './rules/required-if'
import type { RuleRunner, VFunc, VError, Fuji, FujiConfig } from './types'
import { createContext } from './utils'

export const runner: RuleRunner = (schema, context) => {
  return schema.rules.reduce((ctx, func) => func(ctx), context)
}

function createConfig(config: Partial<FujiConfig>): FujiConfig {
  return { ...DEFAULT_CONFIG, ...config }
}

function runWith<Value>(
  schema: Fuji<Value>,
  value: unknown,
  config: Partial<FujiConfig> = DEFAULT_CONFIG
): VError[] {
  const configuration = createConfig(config)
  const context = createContext<Value>(value as Value, configuration)
  const { errors } = runner<Value>(schema, context)

  return errors
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
