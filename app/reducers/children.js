// @flow

import * as immutable from 'immutable';

type ActionType = 'ADD_CHILD' | 'UPDATE_CHILD' | 'CLEAR';

const ADD_CHILD:ActionType = 'ADD_CHILD';
const UPDATE_CHILD:ActionType = 'UPDATE_CHILD';
const CLEAR: ActionType = 'CLEAR';

type ChildType = {
    id: string,
    name: string,
    entryTime: string,
    leaveTime: ?string,
    cost: ?number
};


type ChildrenReducerType = {[string]: ChildType};

type actionType = {
    +type: ActionType,
    +payload: ChildType
};

const defaultState = {};

function children(state: ChildrenReducerType = defaultState, action: actionType) {
  switch (action.type) {
    case ADD_CHILD:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case UPDATE_CHILD:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case CLEAR:
      // $FlowFixMe
      return immutable.fromJS(state).filter((child: *) => !child.get('leaveTime')).toJS();
    default:
      return state;
  }
}

const addChild = (data: ChildType) => ({ type: ADD_CHILD, payload: data });
const updateChild = (data: ChildType) => ({ type: UPDATE_CHILD, payload: data });
const clearChildren = () => ({ type: CLEAR, payload: {} });

const selectChildren = (state: *) => state.children;


export {
  children, addChild, updateChild, selectChildren, clearChildren
};

export type {
  ChildType,
  ChildrenReducerType
};

