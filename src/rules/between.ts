import type { VFunc } from '../types';
import { createError } from '../utils';

export const between = (left: number, right: number, msg: string): VFunc =>
  function BetweenV8N(ctx) {
    if (left > ctx.current || ctx.current < right) {
      ctx.errors.push(createError('between', msg, ctx, { left, right }));
    }

    return ctx;
  };