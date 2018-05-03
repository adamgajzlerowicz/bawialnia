// @flow

import * as immutable from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

type ActionType = 'SET_MAX_CHILDREN' | 'SET_RATE' | 'SET_FIRST_HOUR_RATE';

const SET_MAX_CHILDREN:ActionType = 'SET_MAX_CHILDREN';
const SET_RATE:ActionType = 'SET_RATE';
const SET_FIRST_HOUR_RATE:ActionType = 'SET_FIRST_HOUR_RATE';

type AppType = {
    maxChildren: number,
    firstHourRate: number,
    rate: number
};

type AppRecordType = RecordOf<AppType>;

const App:RecordFactory<AppType> = immutable.Record({
  maxChildren: 15, firstHourRate: 10.00, rate: 8
});


type actionType = {
    +type: ActionType,
    +payload: number
};

function app(state: AppRecordType = App(), action: actionType) {
  switch (action.type) {
    case SET_FIRST_HOUR_RATE:
      return state.set('firstHourRate', action.payload);
    case SET_MAX_CHILDREN:
      return state.set('maxChildren', action.payload);
    case SET_RATE:
      return state.set('rate', action.payload);
    default:
      return state;
  }
}

const setRate = (rate: number) => ({ type: SET_RATE, payload: rate });
const setFirstHourRate = (rate: number) => ({ type: SET_FIRST_HOUR_RATE, payload: rate });
const setMaxChildren = (payload: number) => ({ type: SET_MAX_CHILDREN, payload });
const selectMaxChildren = (state: *) => state.get('maxChildren');
const selectRate = (state: *) => state.get('rate');
const selectFirstHourRate = (state: *) => state.get('firstHourRate');

export {
  app, setRate, setFirstHourRate, setMaxChildren, selectFirstHourRate, selectMaxChildren, selectRate
};

export type {
  App
};
