import { random } from 'faker';
import { includes } from './includes';
import { createContext } from '../utils';

describe('rules.includes', () => {
  it('should contain err message for invalid value', () => {
    const msg = random.word();
    const { errors } = includes('the', msg)(createContext('text'));
    expect(errors[0]).toHaveProperty('message', msg);
  });

  it('should push error for invalid value', () => {
    const { errors } = includes('uni', random.word())(createContext('verse'));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should push error for invalid value', () => {
    const { errors } = includes('uni', random.word())(createContext('universe'));
    expect(errors).toBeEmpty();
  });
});
