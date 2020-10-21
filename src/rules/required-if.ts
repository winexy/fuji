import type { RequiredIfPredicate, VFunc } from '../types';
import { createError, isUndef } from '../utils';

export const requiredIf = <T = any>(predicate: RequiredIfPredicate, msg: string): VFunc<T> =>
  function RequiredIfV8N(ctx) {
    if (predicate(ctx.root, ctx.current) && isUndef(ctx.current)) {
      ctx.errors.push(createError('required-if', msg, ctx, { f: predicate }));
    }

    return ctx;
  };