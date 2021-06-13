import { arrayOf } from './rules/array-of'
import { RequiredName } from './rules/required'
import { RequiredIfName } from './rules/required-if'
import { shape } from './rules/shape'
import type { VFunc, Fuji, ShapeSchema } from './types'

function fuji<V>(r1: VFunc<V>): Fuji<V>

function fuji<A, B = A, C = B>(r1: VFunc<A, B>, r2: VFunc<B, C>): Fuji<C>

function fuji<A, B = A, C = B, D = C>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>
): Fuji<D>

function fuji<A, B = A, C = B, D = C, E = D>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>
): Fuji<E>

function fuji<A, B = A, C = B, D = C, E = D, F = E>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>
): Fuji<F>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>
): Fuji<G>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>
): Fuji<H>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H>(
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>
): Fuji<I>

function fuji<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H, J = I>(
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
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>,
  r9: VFunc<I, J>,
  r10: VFunc<J, K>
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
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>,
  r9: VFunc<I, J>,
  r10: VFunc<J, K>,
  r11: VFunc<K, L>
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
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>,
  r9: VFunc<I, J>,
  r10: VFunc<J, K>,
  r11: VFunc<K, L>,
  r12: VFunc<L, M>
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
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>,
  r9: VFunc<I, J>,
  r10: VFunc<J, K>,
  r11: VFunc<K, L>,
  r12: VFunc<L, M>,
  r13: VFunc<M, N>
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
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>,
  r9: VFunc<I, J>,
  r10: VFunc<J, K>,
  r11: VFunc<K, L>,
  r12: VFunc<L, M>,
  r13: VFunc<M, N>,
  r14: VFunc<N, O>
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
  r1: VFunc<A, B>,
  r2: VFunc<B, C>,
  r3: VFunc<C, D>,
  r4: VFunc<D, E>,
  r5: VFunc<E, F>,
  r6: VFunc<F, G>,
  r7: VFunc<G, H>,
  r8: VFunc<H, I>,
  r9: VFunc<I, J>,
  r10: VFunc<J, K>,
  r11: VFunc<K, L>,
  r12: VFunc<L, M>,
  r13: VFunc<M, N>,
  r14: VFunc<N, O>,
  r15: VFunc<O, P>
): Fuji<P>

function fuji<Value>(...rules: VFunc<Value>[]): Fuji<Value> {
  return { rules: sortRules(rules) }
}

const f = fuji
fuji.shape = <Shape extends ShapeSchema>(schema: Shape) => fuji(shape(schema))
fuji.array = <Value>(schema: Fuji<Value>) => fuji(arrayOf(schema))

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

export { fuji, f }
