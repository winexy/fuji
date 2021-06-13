import { arrayOf } from './rules/array-of'
import { RequiredName } from './rules/required'
import { RequiredIfName } from './rules/required-if'
import { shape } from './rules/shape'
import type { Rule, Fuji, ShapeSchema } from './types'

function fuji<V>(r1: Rule<V>): Fuji<V>

function fuji<A, B = A, C = B>(r1: Rule<A, B>, r2: Rule<B, C>): Fuji<C>

function fuji<A, B = A, C = B, D = C>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>
): Fuji<D>

function fuji<A, B = A, C = B, D = C, E = D>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>
): Fuji<E>

function fuji<A, B = A, C = B, D = C, E = D, F = E>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>
): Fuji<F>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>
): Fuji<G>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>
): Fuji<H>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>
): Fuji<I>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H, J = I>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>,
  r9: Rule<I, J>
): Fuji<J>

function fuji<
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H,
  J = I,
  K = J
>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>,
  r9: Rule<I, J>,
  r10: Rule<J, K>
): Fuji<K>

function fuji<
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H,
  J = I,
  K = J,
  L = K
>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>,
  r9: Rule<I, J>,
  r10: Rule<J, K>,
  r11: Rule<K, L>
): Fuji<L>

function fuji<
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H,
  J = I,
  K = J,
  L = K,
  M = L
>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>,
  r9: Rule<I, J>,
  r10: Rule<J, K>,
  r11: Rule<K, L>,
  r12: Rule<L, M>
): Fuji<M>

function fuji<
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H,
  J = I,
  K = J,
  L = K,
  M = L,
  N = M
>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>,
  r9: Rule<I, J>,
  r10: Rule<J, K>,
  r11: Rule<K, L>,
  r12: Rule<L, M>,
  r13: Rule<M, N>
): Fuji<N>

function fuji<
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H,
  J = I,
  K = J,
  L = K,
  M = L,
  N = M,
  O = N
>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>,
  r9: Rule<I, J>,
  r10: Rule<J, K>,
  r11: Rule<K, L>,
  r12: Rule<L, M>,
  r13: Rule<M, N>,
  r14: Rule<N, O>
): Fuji<O>

function fuji<
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H,
  J = I,
  K = J,
  L = K,
  M = L,
  N = M,
  O = N,
  P = O
>(
  r1: Rule<A, B>,
  r2: Rule<B, C>,
  r3: Rule<C, D>,
  r4: Rule<D, E>,
  r5: Rule<E, F>,
  r6: Rule<F, G>,
  r7: Rule<G, H>,
  r8: Rule<H, I>,
  r9: Rule<I, J>,
  r10: Rule<J, K>,
  r11: Rule<K, L>,
  r12: Rule<L, M>,
  r13: Rule<M, N>,
  r14: Rule<N, O>,
  r15: Rule<O, P>
): Fuji<P>

function fuji<Value>(...rules: Rule<Value>[]): Fuji<Value> {
  return { rules: sortRules(rules) }
}

const f = fuji
fuji.shape = <Shape extends ShapeSchema>(schema: Shape) => fuji(shape(schema))
fuji.array = <Value>(schema: Fuji<Value>) => fuji(arrayOf(schema))

const highPriority = [RequiredName, RequiredIfName]

function sortRules<Value>(rules: Rule<Value>[]): Rule<Value>[] {
  return rules.sort((rule1, rule2) => {
    if (highPriority.includes(rule1.name)) {
      return -1
    } else if (highPriority.includes(rule2.name)) {
      return 1
    }

    return 0
  })
}

export { fuji, f }
