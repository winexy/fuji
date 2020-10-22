import { required } from './required';
import { createContext } from '../utils';
import { VFunc } from '../types';

describe('rules.required', () => {
  let rule: VFunc<any>;
  beforeEach(() => {
    rule = required('error');
  });

  it('should push error for undefined value', () => {
    const { errors } = rule(createContext(undefined));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should push provided message for invalid value', () => {
    const { errors } = rule(createContext(undefined));
    expect(errors[0]).toHaveProperty('message', 'error');
  });

  it('should not push error for non undefined value', () => {
    const { errors } = rule(createContext(42));
    expect(errors).toBeEmpty();
  });
});