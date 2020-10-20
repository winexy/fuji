import type { ShapeSchema, VContext, VFunc } from '../types';
import { validate } from '../fuji';
import { isUndef } from '../utils';

function validateShape(schema: ShapeSchema, context: VContext) {
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

export const shape = (schema: ShapeSchema): VFunc =>
  function ObjectOfV8N(ctx) {
    return validateShape(schema, ctx);
  };