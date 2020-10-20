import { VFunc, TransformFunc } from '../types';

export const transform = <T>(f: TransformFunc): VFunc<T> =>
  function TransformFn(ctx) {
    ctx.current = f(ctx.current, ctx.original);
    return ctx;
  };
