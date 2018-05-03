import { Map } from 'immutable';
import { children, Child } from './children';

describe('children reducer', () => {
  const child = new Child({
    name: 'foo', entry: 'bar', leave: 'narn', id: '2'
  });

  it('should have default state', () => {
    expect(children(undefined, { type: 'dupa' })).toEqual(Map());
  });
  it('should add child', () => {
    const result = children(Map(), { type: 'ADD_CHILD', payload: child });
    expect(result).toEqual(Map({ '2': child }));
  });
});
