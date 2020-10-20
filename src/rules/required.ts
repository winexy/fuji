import type { VFunc } from '../types';
import { createError, isUndef } from '../utils';

export const required = (msg: string): VFunc =>
  function RequiredV8N(ctx) {
    if (isUndef(ctx.current) || ctx.current === '') {
      ctx.errors.push(createError('required', msg, ctx));
    }

    return ctx;
  };
