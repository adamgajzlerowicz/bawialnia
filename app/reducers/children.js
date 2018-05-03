// @flow

import { Map, Record } from 'immutable';

type ActionType = 'ADD_CHILD' | 'UPDATE_CHILD';

const ADD_CHILD:ActionType = 'ADD_CHILD';
const UPDATE_CHILD:ActionType = 'UPDATE_CHILD';

type ChildType = Record<{
    +id: string,
    +name: string,
    +entryTime: string,
    leaveTime: string
}>;

const Child:ChildType = Record({
  id: '', name: '', entryTime: '', leaveTime: ''
});

type ChildrenReducerType = Map<Record<ChildType>>;

type actionType = {
    +type: ActionType,
    +payload: ChildType
};

function children(state: ChildrenReducerType = Map(), action: actionType) {
  switch (action.type) {
    case ADD_CHILD:
      return state.set(action.payload.get('id'), action.payload);
      // const id = UUID.v4();
    case UPDATE_CHILD:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
}

const addChild = (data: ChildType) => ({ type: ADD_CHILD, payload: data });
const updateChild = (data: ChildType) => ({ type: UPDATE_CHILD, payload: data });

const selectChildren = state => state.children;

export {
  children, addChild, updateChild, selectChildren, Child
};

export type {
  ChildType,
  ChildrenReducerType
};
