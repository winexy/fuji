import type { VFunc } from '../types';
import { createError } from '../utils';

export const includes = <T>(target: T, msg: string): VFunc<{ indexOf: (x: T) => number }> =>
  function IncludesV8N(ctx) {
    if (ctx.current.indexOf(target) === -1) {
      ctx.errors.push(createError('includes', msg, ctx, { target }));
    }

    return ctx;
  };
