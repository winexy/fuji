import type { VFunc } from '../types';
import { createError } from '../utils';

type Predicate<T> = (current: T) => boolean;

export const use = <T>(rule: string, predicate: Predicate<T>, msg: string): VFunc<T> => 
  function UseV8N(ctx) {
    if (!predicate(ctx.current)) {
      ctx.errors.push(createError(rule, msg, ctx, { f: predicate }));
    }

    return ctx;
  };