import type { VFunc } from '../types';
import { createError } from '../utils';

export const numeric = (msg: string): VFunc<string | number> =>
  function NumericV8N(ctx) {
    if (Number.isNaN(ctx.current)) {
      ctx.errors.push(createError('numeric', msg, ctx));
    }

    return ctx;
  };
