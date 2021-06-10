import { random } from 'faker';
import { string } from './string';
import { createContext } from '../utils';
import { VFunc } from '../types';
import { DEFAULT_CONFIG } from '../fuji';

describe('rules.string', () => {
  let rule: VFunc<string>;
  let msg = random.word();
  beforeEach(() => {
    rule = string(msg);
  });

  it('should push provided message for invalid value', () => {
    const { errors } = rule(createContext({}, DEFAULT_CONFIG));
    expect(errors[0]).toHaveProperty('message', msg);
  });

  it('should push error for number', () => {
    const { errors } = rule(createContext(42, DEFAULT_CONFIG));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should push error for boolean', () => {
    const { errors } = rule(createContext(false, DEFAULT_CONFIG));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should push error for array', () => {
    const { errors } = rule(createContext([], DEFAULT_CONFIG));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should not push error for string type', () => {
    const res = rule(createContext('hello', DEFAULT_CONFIG));
    expect(res.errors).toBeEmpty();
  });
});