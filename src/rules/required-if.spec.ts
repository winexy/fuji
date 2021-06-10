import { random } from 'faker';
import { requiredIf } from './required-if';
import { createContext } from '../utils';
import { VFunc } from '../types';
import { DEFAULT_CONFIG } from '../fuji';

describe('rules.required-if', () => {
  let rule: VFunc<{ v: number }>;
  let msg = random.word();
  beforeEach(() => {
    rule = requiredIf<{ v: number }>(root => root.v === 42, msg);
  });

  it('should return provided error message for invalid value', () => {
    const ctx = createContext({ v: 42 }, DEFAULT_CONFIG);
    ctx.current = undefined;

    const res = rule(ctx);

    expect(res.errors[0]).toHaveProperty('message', msg);
  });

  it('should push errors for true predicate', () => {
    const ctx = createContext({ v: 42 }, DEFAULT_CONFIG);
    ctx.current = undefined;

    const { errors } = rule(ctx);

    expect(errors).toBeArrayOfSize(1);
  });

  it('should not push error for false predicate', () => {
    const ctx = createContext({ v: 42 }, DEFAULT_CONFIG);
    ctx.current = 42;

    const { errors } = rule(ctx);

    expect(errors).toBeEmpty();
  });
});