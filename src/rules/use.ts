import type { VFunc } from '../types';
import { createError } from '../utils';

type Predicate<T> = (current: T) => boolean;

export interface CustomRuleI {
  Type: 'custom'
}

export const use = <T, TypeString extends CustomRuleI['Type']>(rule: TypeString, predicate: Predicate<T>, msg: string): VFunc<T> => 
  function UseV8N(ctx) {
    if (!predicate(ctx.current)) {
      ctx.errors.push(createError(rule, msg, ctx, { f: predicate }));
    }

    return ctx;
  };