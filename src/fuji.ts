import type { VContext, VFunc, VError, Fuji } from './types';
import { createContext, log } from './utils';

export function validate(
  schema: Fuji, 
  context: VContext
): VContext {
  return schema.rules.reduce(
    (ctx, f) => {
      log('f.name', f.name, ctx.current, ctx.errors);
      return f(ctx);
    }, context
  );
}

function runWith(schema: Fuji) {
  return <T>(v: T): VError[] => {
    const res = validate ( schema, createContext <T>(v));
    log({ res });
    return res.errors;
  };
}

const fuji = (...rules: VFunc[]): Fuji => ({ rules });

fuji.runWith = runWith;

export { fuji };
