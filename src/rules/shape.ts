import type { ShapeSchema, VContext, VFunc } from '../types';
import { validate } from '../fuji';
import { isUndef } from '../utils';

function validateShape<T>(schema: ShapeSchema<T>, context: VContext) {
  return Object.keys(schema).reduce((ctx, key) => {
    const res = validate(schema[key], {
      root: ctx.root,
      original: !isUndef(ctx.original)
        ? ctx.original[key] : undefined,
      current: !isUndef(ctx.current)
        ? ctx.current[key] : undefined,
      path: [...ctx.path, key],
      errors: [],
    });

    ctx.errors.push(...res.errors);

    return ctx;
  }, context);
}

export const shape = <T>(schema: ShapeSchema<T>): VFunc =>
  function ObjectOfV8N(ctx) {
    return validateShape(schema, ctx);
  };
  