import { requiredIf } from './required-if';
import { createContext } from '../utils';
import { VFunc } from '../types';

describe('rules.required-if', () => {
  let rule: VFunc<{ v: number }>;
  beforeEach(() => {
    rule = requiredIf<{ v: number }>(root => root.v === 42, 'required-if error');
  });

  it('should return provided error message for invalid value', () => {
    const ctx = createContext({ v: 42 });
    ctx.current = undefined;

    const res = rule(ctx);

    expect(res.errors[0]).toHaveProperty('message', 'required-if error');
  });

  it('should push errors for true predicate', () => {
    const ctx = createContext({ v: 42 });
    ctx.current = undefined;

    const { errors } = rule(ctx);

    expect(errors).toBeArrayOfSize(1);
  });

  it('should not push error for false predicate', () => {
    const ctx = createContext({ v: 42 });
    ctx.current = 42;

    const { errors } = rule(ctx);

    expect(errors).toBeEmpty();
  });
});