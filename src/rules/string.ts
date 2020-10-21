import { VContext, VFunc } from '../types';
import { createError } from '../utils';

export const string = (msg: string): VFunc<string> =>
  function StringV8N(ctx): VContext<VContext['root'], string> {
    if (typeof ctx.current !== 'string') {
      ctx.errors.push(createError('string', msg, ctx));
    }

    return ctx;
  };