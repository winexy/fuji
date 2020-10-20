import type { VFunc } from '../types';
import { createError } from '../utils';

export const even = (msg: string): VFunc<number> =>
  function EvenV8N(ctx) {
    if (ctx.current % 2 === 1) {
      ctx.errors.push(createError('even', msg, ctx));
    }

    return ctx;
  };