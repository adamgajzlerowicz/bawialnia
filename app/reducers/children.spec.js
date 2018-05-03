import { children } from './children';

describe('children reducer', () => {
  it('should have default state', () => {
    expect(children(undefined, { type: 'dupa' })).toEqual({});
  });
  it('should add child', () => {
    const result = children({ foo: 'bar' }, { type: 'ADD_CHILD', payload: { bar: 'rar', id: 'f' } });
    expect(result).toEqual({ foo: 'bar', f: { bar: 'rar', id: 'f' } });
  });
});
