import type { VFunc } from '../types';
import { createError } from '../utils';

export const number = (msg: string): VFunc<number> =>
  function NumberV8N(ctx) {
    if (typeof ctx.current !== 'number' || Number.isNaN(ctx.current)) {
      ctx.errors.push(createError('number', msg, ctx));
    }

    return ctx;
  };
