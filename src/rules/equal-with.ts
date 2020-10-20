import type { VFunc } from '../types';
import { createError } from '../utils';

export const equalWith = (f: (root: any) => any, msg: string): VFunc =>
  function EqualWithV8N(ctx) {
    if (f(ctx.root) !== ctx.current) {
      ctx.errors.push(createError('equal-with', msg, ctx, { f }));
    }

    return ctx;
  };
