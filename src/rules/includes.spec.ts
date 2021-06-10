import { random } from 'faker';
import { includes } from './includes';
import { createContext } from '../utils';
import { DEFAULT_CONFIG } from '../fuji';

describe('rules.includes', () => {
  it('should contain err message for invalid value', () => {
    const msg = random.word();
    const { errors } = includes('the', msg)(createContext('text', DEFAULT_CONFIG));
    expect(errors[0]).toHaveProperty('message', msg);
  });

  it('should push error for invalid value', () => {
    const { errors } = includes('uni', random.word())(createContext('verse', DEFAULT_CONFIG));
    expect(errors).toBeArrayOfSize(1);
  });

  it('should push error for invalid value', () => {
    const { errors } = includes('uni', random.word())(createContext('universe', DEFAULT_CONFIG));
    expect(errors).toBeEmpty();
  });
});
