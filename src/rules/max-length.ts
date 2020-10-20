import type { VFunc } from '../types';
import { createError } from '../utils';

export const maxLength = <T>(limit: number, msg: string): VFunc<T[]> =>
  function MaxLenV8N(ctx) {
    if (ctx.current != null && ctx.current.length > limit) {
      ctx.errors.push(createError('max-length', msg, ctx, { limit }));
    }

    return ctx;
  };