import type { VContext, VFunc, VError, Fuji } from './types';
import { createContext } from './utils';

export function validate(
  schema: Fuji, 
  context: VContext
): VContext {
  return schema.rules.reduce(
    (ctx, f) => f(ctx), context
  );
}

function runWith<T>(schema: Fuji, v: T): VError[] {
  const res = validate(schema, createContext<T>(v));
  return res.errors;
}

const fuji = (...rules: VFunc[]): Fuji => ({ rules });

export { fuji, runWith };