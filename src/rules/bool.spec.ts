import { bool } from './bool';
import { createContext } from '../utils';

describe('rules.bool', () => {
  let rule;
  beforeEach(() => {
    rule = bool('bool error');
  });

  it('should contain err message for invalid value', () => {
    const { errors } = rule(createContext('test'));
    expect(errors[0]).toHaveProperty('message', 'bool error');
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