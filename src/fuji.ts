import type { VContext, VFunc, VError, Fuji } from './types';
import { createContext } from './utils';

export function validate<T>(
  schema: Fuji<T>, 
  context: VContext
): VContext {
  return schema.rules.reduce(
    (ctx, f) => f(ctx), context
  );
}

function runWith<T>(schema: Fuji<T>, v: T): VError[] {
  const res = validate<T>(schema, createContext<T>(v));
  return res.errors;
}

const fuji = <T>(...rules: VFunc<T>[]): Fuji<T> => ({ rules });

export { fuji, runWith };