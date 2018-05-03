import { Map } from 'immutable';
import { children, Child } from './children';

describe('children reducer', () => {
  const child = new Child({
    name: 'foo', entryTime: 'bar', leaveTime: 'narn', id: '2'
  });

  it('should have default state', () => {
    expect(children(undefined, { type: 'dupa' })).toEqual(Map());
  });
  it('should add child', () => {
    const result = children(Map(), { type: 'ADD_CHILD', payload: child });
    expect(result).toEqual(Map({ '2': child }));
  });

  it('should update child', () => {
    const state = Map();
    const updated = new Child({
      name: 'foo2', entryTime: 'bar2', leaveTime: 'narn2', id: 'f'
    });
    const result = children(state.set('f', child), { type: 'UPDATE_CHILD', payload: updated });
    expect(result).toEqual(Map({ 'f': updated }));
  });
});
