import { random } from 'faker';
import { positive } from './positive';
import { createContext } from '../utils';

describe('rules.positive', () => {
  let rule;
  let msg = random.word();
  beforeEach(() => {
    rule = positive(msg);
  });

  it('should contain err message for invalid values', () => {
    const n = Math.abs(random.number()) * -1;
    const { errors } = rule(createContext(n));
    expect(errors[0]).toHaveProperty('message', msg); 
  });

  it('should push error if number is negative', () => {
    const n = Math.abs(random.number()) * -1;
    const { errors } = rule(createContext(n));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should not push error if number is positive', () => {
    const n = Math.abs(random.number());
    const { errors } = rule(createContext(n));
    expect(errors).toBeEmpty();
  });
});