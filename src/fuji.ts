import { arrayOf } from './rules/array-of'
import { shape } from './rules/shape'
import type {
  Fuji,
  Rule,
  ErrorType,
  ShapeSchema
} from './types'

function fuji<TS extends ErrorType, V>(r1: Rule<TS, V>): Fuji<TS, V>

function fuji<TS extends ErrorType, A, B = A, C = B>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>
): Fuji<TS, C>

function fuji<TS extends ErrorType, A, B = A, C = B, D = C>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>,
  r3: Rule<TS, C, D>
): Fuji<TS, D>

function fuji<TS extends ErrorType, A, B = A, C = B, D = C, E = D>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>,
  r3: Rule<TS, C, D>,
  r4: Rule<TS, D, E>
): Fuji<TS, E>

function fuji<TS extends ErrorType, A, B = A, C = B, D = C, E = D, F = E>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>,
  r3: Rule<TS, C, D>,
  r4: Rule<TS, D, E>,
  r5: Rule<TS, E, F>
): Fuji<TS, F>

function fuji<
  TS extends ErrorType,
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F
>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>,
  r3: Rule<TS, C, D>,
  r4: Rule<TS, D, E>,
  r5: Rule<TS, E, F>,
  r6: Rule<TS, F, G>
): Fuji<TS, G>

function fuji<
  TS extends ErrorType,
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G
>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>,
  r3: Rule<TS, C, D>,
  r4: Rule<TS, D, E>,
  r5: Rule<TS, E, F>,
  r6: Rule<TS, F, G>,
  r7: Rule<TS, G, H>
): Fuji<TS, H>

function fuji<
  TS extends ErrorType,
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H
>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>,
  r3: Rule<TS, C, D>,
  r4: Rule<TS, D, E>,
  r5: Rule<TS, E, F>,
  r6: Rule<TS, F, G>,
  r7: Rule<TS, G, H>,
  r8: Rule<TS, H, I>
): Fuji<TS, I>

function fuji<
  TS extends ErrorType,
  A,
  B = A,
  C = B,
  D = C,
  E = D,
  F = E,
  G = F,
  H = G,
  I = H,
  J = I
>(
  r1: Rule<TS, A, B>,
  r2: Rule<TS, B, C>,
  r3: Rule<TS, C, D>,
  r4: Rule<TS, D, E>,
  r5: Rule<TS, E, F>,
  r6: Rule<TS, F, G>,
  r7: Rule<TS, G, H>,
  r8: Rule<TS, H, I>,
  r9: Rule<TS, I, J>
): Fuji<TS, J>

function fuji<
  TS extends ErrorType,
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
  r01: Rule<TS, A, B>,
  r02: Rule<TS, B, C>,
  r03: Rule<TS, C, D>,
  r04: Rule<TS, D, E>,
  r05: Rule<TS, E, F>,
  r06: Rule<TS, F, G>,
  r07: Rule<TS, G, H>,
  r08: Rule<TS, H, I>,
  r09: Rule<TS, I, J>,
  r10: Rule<TS, J, K>
): Fuji<TS, K>

function fuji<
  TS extends ErrorType,
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
  r01: Rule<TS, A, B>,
  r02: Rule<TS, B, C>,
  r03: Rule<TS, C, D>,
  r04: Rule<TS, D, E>,
  r05: Rule<TS, E, F>,
  r06: Rule<TS, F, G>,
  r07: Rule<TS, G, H>,
  r08: Rule<TS, H, I>,
  r09: Rule<TS, I, J>,
  r10: Rule<TS, J, K>,
  r11: Rule<TS, K, L>
): Fuji<TS, L>

function fuji<
  TS extends ErrorType,
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
  r01: Rule<TS, A, B>,
  r02: Rule<TS, B, C>,
  r03: Rule<TS, C, D>,
  r04: Rule<TS, D, E>,
  r05: Rule<TS, E, F>,
  r06: Rule<TS, F, G>,
  r07: Rule<TS, G, H>,
  r08: Rule<TS, H, I>,
  r09: Rule<TS, I, J>,
  r10: Rule<TS, J, K>,
  r11: Rule<TS, K, L>,
  r12: Rule<TS, L, M>
): Fuji<TS, M>

function fuji<
  TS extends ErrorType,
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
  r01: Rule<TS, A, B>,
  r02: Rule<TS, B, C>,
  r03: Rule<TS, C, D>,
  r04: Rule<TS, D, E>,
  r05: Rule<TS, E, F>,
  r06: Rule<TS, F, G>,
  r07: Rule<TS, G, H>,
  r08: Rule<TS, H, I>,
  r09: Rule<TS, I, J>,
  r10: Rule<TS, J, K>,
  r11: Rule<TS, K, L>,
  r12: Rule<TS, L, M>,
  r13: Rule<TS, M, N>
): Fuji<TS, N>

function fuji<
  TS extends ErrorType,
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
  r01: Rule<TS, A, B>,
  r02: Rule<TS, B, C>,
  r03: Rule<TS, C, D>,
  r04: Rule<TS, D, E>,
  r05: Rule<TS, E, F>,
  r06: Rule<TS, F, G>,
  r07: Rule<TS, G, H>,
  r08: Rule<TS, H, I>,
  r09: Rule<TS, I, J>,
  r10: Rule<TS, J, K>,
  r11: Rule<TS, K, L>,
  r12: Rule<TS, L, M>,
  r13: Rule<TS, M, N>,
  r14: Rule<TS, N, O>
): Fuji<TS, O>

function fuji<
  TS extends ErrorType,
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
  r01: Rule<TS, A, B>,
  r02: Rule<TS, B, C>,
  r03: Rule<TS, C, D>,
  r04: Rule<TS, D, E>,
  r05: Rule<TS, E, F>,
  r06: Rule<TS, F, G>,
  r07: Rule<TS, G, H>,
  r08: Rule<TS, H, I>,
  r09: Rule<TS, I, J>,
  r10: Rule<TS, J, K>,
  r11: Rule<TS, K, L>,
  r12: Rule<TS, L, M>,
  r13: Rule<TS, M, N>,
  r14: Rule<TS, N, O>,
  r15: Rule<TS, O, P>
): Fuji<TS, P>

function fuji<Types extends ErrorType, Value>(
  ...rules: Rule<Types, Value>[]
): Fuji<Types, Value> {
  return { rules: sortRules(rules) }
}

const f = fuji
fuji.shape = <Shape extends ShapeSchema>(schema: Shape) => f(shape(schema))
fuji.array = <Value>(schema: Fuji<ErrorType, Value>) => f(arrayOf(schema))

const requiredTypes: ErrorType[] = ['required', 'required-if']

function sortRules<Types extends ErrorType, Value>(
  rules: Rule<Types, Value>[]
): Rule<Types, Value>[] {
  return rules.sort((rule1, rule2) => {
    if (requiredTypes.includes(rule1.type)) {
      return -1
    }

    if (requiredTypes.includes(rule2.type)) {
      return 1
    }

    return 0
  })
}

export { fuji, f }
