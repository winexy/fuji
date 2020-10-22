import { random } from 'faker';
import { string } from './string';
import { createContext } from '../utils';
import { VFunc } from '../types';

describe('rules.string', () => {
  let rule: VFunc<string>;
  let msg = random.word();
  beforeEach(() => {
    rule = string(msg);
  });

  it('should push provided message for invalid value', () => {
    const { errors } = rule(createContext({}));
    expect(errors[0]).toHaveProperty('message', msg);
  });

  it('should push error for number', () => {
    const { errors } = rule(createContext(42));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should push error for boolean', () => {
    const { errors } = rule(createContext(false));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should push error for array', () => {
    const { errors } = rule(createContext([]));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should not push error for string type', () => {
    const res = rule(createContext('hello'));
    expect(res.errors).toBeEmpty();
  });
});