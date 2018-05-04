// @flow

import * as immutable from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

type ActionType = 'ADD_CHILD' | 'UPDATE_CHILD' | 'RESET_CHILDREN';

const ADD_CHILD:ActionType = 'ADD_CHILD';
const UPDATE_CHILD:ActionType = 'UPDATE_CHILD';
const RESET_CHILDREN: ActionType = 'RESET_CHILDREN';

type ChildType = {
    id: string,
    name: string,
    entryTime: string,
    leaveTime: ?string,
    cost: number
};

type ChildRecordType = RecordOf<ChildType>;

const Child:RecordFactory<ChildType> = immutable.Record({
  id: '', name: '', entryTime: '', leaveTime: null, cost: 0
});

type ChildrenReducerType = immutable.Map<string, ChildRecordType>;

type actionType = {
    +type: ActionType,
    +payload: ChildRecordType
};

const defaultState: ChildrenReducerType = immutable.Map();

function children(plainState: * = {}, action: actionType) {
  const state: ChildrenReducerType = immutable.Map(plainState);
  switch (action.type) {
    case ADD_CHILD:
      return state.set(action.payload.get('id'), action.payload);
    case UPDATE_CHILD:
      return state.set(action.payload.get('id'), action.payload);
    case RESET_CHILDREN:
      return defaultState;
    default:
      return state;
  }
}

const addChild = (data: *) => ({ type: ADD_CHILD, payload: data });
const updateChild = (data: ChildRecordType) => ({ type: UPDATE_CHILD, payload: data });

const selectChildren = (state: *) => state.children;


export {
  children, addChild, updateChild, selectChildren, Child
};

export type {
  ChildType,
  ChildRecordType,
  ChildrenReducerType
};

