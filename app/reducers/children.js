// @flow

import * as immutable from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

type ActionType = 'ADD_CHILD' | 'UPDATE_CHILD';

const ADD_CHILD:ActionType = 'ADD_CHILD';
const UPDATE_CHILD:ActionType = 'UPDATE_CHILD';

type ChildType = {
    +id: string,
    +name: string,
    +entryTime: string,
    leaveTime: string
};

type ChildRecordType = RecordOf<ChildType>;

const Child:RecordFactory<ChildType> = immutable.Record({
  id: '', name: '', entryTime: '', leaveTime: ''
});

type ChildrenReducerType = immutable.Map<string, ChildRecordType>;

type actionType = {
    +type: ActionType,
    +payload: ChildRecordType
};

function children(state: ChildrenReducerType = immutable.Map(), action: actionType) {
  switch (action.type) {
    case ADD_CHILD:
      return state.set(action.payload.get('id'), action.payload);
      // const id = UUID.v4();
    case UPDATE_CHILD:
      return state.set(action.payload.get('id'), action.payload);
    default:
      return state;
  }
}

const addChild = (data: ChildRecordType) => ({ type: ADD_CHILD, payload: data });
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
