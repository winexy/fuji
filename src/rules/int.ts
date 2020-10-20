import type { VFunc } from '../types';
import { createError } from '../utils';

export const int = (msg: string): VFunc<number> =>
  function IntV8N(ctx) {
    if (!Number.isInteger(ctx.current)) {
      ctx.errors.push(createError('int', msg, ctx));
    }

    return ctx;
  };