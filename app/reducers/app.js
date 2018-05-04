// @flow

import type { RecordFactory, RecordOf } from 'immutable';
import * as immutable from 'immutable';

type ActionType = 'SET_MAX_CHILDREN' | 'SET_RATE' | 'SET_FIRST_HOUR_RATE' | *;

const SET_MAX_CHILDREN: ActionType = 'SET_MAX_CHILDREN';
const SET_RATE: ActionType = 'SET_RATE';
const SET_FIRST_HOUR_RATE: ActionType = 'SET_FIRST_HOUR_RATE';
const SET_FORM_VALUE = 'SET_FORM_VALUE';

type AppType = {
  maxChildren: number,
  firstHourRate: number,
  rate: number,
  formValue: string
};

type AppRecordType = RecordOf<AppType> | void;

const App: RecordFactory<AppType> = immutable.Record({
  maxChildren: 15, firstHourRate: 10.00, rate: 8, formValue: ''
});


type actionType = {
  +type: ActionType,
  +payload?: number | string
};

function app(planeState: * = {}, action: actionType) {
  const state = App(planeState);
  switch (action.type) {
    case SET_FIRST_HOUR_RATE:
      return state.set('firstHourRate', action.payload);
    case SET_MAX_CHILDREN:
      return state.set('maxChildren', action.payload);
    case SET_RATE:
      return state.set('rate', action.payload);
    case SET_FORM_VALUE:
      return state.set('formValue', action.payload);
    default:
      return state;
  }
}

const setRate = (rate: number) => ({ type: SET_RATE, payload: rate });
const setFirstHourRate = (rate: number) => ({ type: SET_FIRST_HOUR_RATE, payload: rate });
const setMaxChildren = (payload: number) => ({ type: SET_MAX_CHILDREN, payload });
const setFormValue = (payload: string) => ({ type: SET_FORM_VALUE, payload });
const selectMaxChildren = (state: *) => state.app.maxChildren;
const selectRate = (state: *) => state.app.rate;
const selectFirstHourRate = (state: *) => state.app.firstHourRate;
const selectFormValue = (state: *) => state.app.formValue;

export {
  app,
  setRate,
  setFirstHourRate,
  setMaxChildren,
  setFormValue,
  selectFirstHourRate,
  selectMaxChildren,
  selectRate,
  selectFormValue
};

export type {
  App, AppType
};
