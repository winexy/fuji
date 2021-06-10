import type { VFunc } from '../types';
import { createError } from '../utils';

export type OneOfType = 'one-of'

export const oneOf = <T>(variants: T[], msg: string): VFunc<T> =>
  function OneOfV8N(ctx) {
    if (variants.indexOf(ctx.current) === -1) {
      ctx.errors.push(createError('one-of', msg, ctx, { variants }));
    }

    return ctx;
  };