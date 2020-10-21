import { string } from './string';
import { createContext } from '../utils';

describe('rules.string', () => {
  let rule = null;
  beforeEach(() => {
    rule = string('error');
  });
  
  it('should push error for number', () => {
    const res = rule(createContext(42));

    expect(res.errors).toBeArrayOfSize(1);
    expect(res.errors[0]).toHaveProperty('message', 'error');
    expect(res.errors[0]).toHaveProperty('type', 'string');
  });

  it('should push error for boolean', () => {
    const res = rule(createContext(false));

    expect(res.errors).toBeArrayOfSize(1);
    expect(res.errors[0]).toHaveProperty('message', 'error');
    expect(res.errors[0]).toHaveProperty('type', 'string');
  });

  it('should push error for array', () => {
    const res = rule(createContext([]));

    expect(res.errors).toBeArrayOfSize(1);
    expect(res.errors[0]).toHaveProperty('message', 'error');
    expect(res.errors[0]).toHaveProperty('type', 'string');
  });

  it('should not push error for string type', () => {
    const res = rule(createContext('hello'));
    expect(res.errors).toBeArrayOfSize(0);
  });
});