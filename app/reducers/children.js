// @flow

const ADD_CHILD = 'ADD_CHILD';
const UPDATE_CHILD = 'UPDATE_CHILD';

type ChildType = {
    +id: ?string,
    +name: string,
    +entryTime: string,
    leaveTime: string
};

type ChildrenReducerType = { [string]: ChildType };

type actionType = {
    +type: string,
    +payload: ChildType
};

function children(state: ChildrenReducerType = {}, action: actionType) {
  switch (action.type) {
    case ADD_CHILD:
      return {
        ...state,
        [action.payload.id]: Object.assign({}, action.payload, { id: action.payload.id })
      };
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
  children, addChild, updateChild, selectChildren
};

export type {
  ChildType,
  ChildrenReducerType
};
