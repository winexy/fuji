import { random } from 'faker';
import { bool } from './bool';
import { createContext } from '../utils';

describe('rules.bool', () => {
  let rule;
  let msg;
  beforeEach(() => {
    rule = bool(random.word());
  });

  it('should contain err message for invalid value', () => {
    const { errors } = rule(createContext('test'));
    expect(errors[0]).toHaveProperty('message', msg);
  });

  it('should push error for invalid value', () => {
    const { errors } = rule(createContext(42));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should contain err message for invalid value', () => {
    const { errors } = rule(createContext(false));
    expect(errors).toBeEmpty();
  });
});