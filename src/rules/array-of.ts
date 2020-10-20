import type { Fuji, VFunc } from '../types';
import { validate } from '../fuji';

export const arrayOf = <T>(schema: Fuji<T>): VFunc => 
  function ArrayOfV8N(context) {
    if (Array.isArray(context.current)) {
      return context.current.reduce((ctx, value, index) => {
        const res = validate(schema, {
          root: ctx.root,
          current: value,
          original: value,
          path: [...ctx.path, index.toString()],
          errors: []
        });

        context.errors.push(...res.errors);

        return ctx;
      }, context);
    }

    return context; 
  };
