import type { VFunc } from '../types';
import { createError, isUndef } from '../utils';

export const array = (msg: string): VFunc<any[]> =>
  function ArrayV8N(ctx) {
    if (!isUndef(ctx.current) && !Array.isArray(ctx.current)) {
      ctx.errors.push(createError('array', msg, ctx));
    }

    return ctx;
  };
