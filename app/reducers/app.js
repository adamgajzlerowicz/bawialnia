// @flow

import type { RecordFactory, RecordOf } from 'immutable';
import * as immutable from 'immutable';

type ActionType = 'SET_MAX_CHILDREN' | 'SET_RATE' | 'SET_FIRST_HOUR_RATE' | *;

const SET_MAX_CHILDREN: ActionType = 'SET_MAX_CHILDREN';
const SET_RATE: ActionType = 'SET_RATE';
const SET_FIRST_HOUR_RATE: ActionType = 'SET_FIRST_HOUR_RATE';
const SET_FORM_VALUE = 'SET_FORM_VALUE';
const SET_SHOW_SETTINGS = 'SET_SHOW_SETTINGS';

type AppType = {
  maxChildren: number,
  firstHourRate: number,
  rate: number,
  formValue: string,
  showSettings: boolean
};

const App: RecordFactory<AppType> = immutable.Record({
  maxChildren: 15, firstHourRate: 10.00, rate: 8, formValue: '', showSettings: 'false'
});


type actionType = {
  +type: ActionType,
  +payload: *
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
    case SET_SHOW_SETTINGS:
      return state.set('showSettings', action.payload);
    default:
      return state;
  }
}

const setRate = (rate: number) => ({ type: SET_RATE, payload: rate });
const setFirstHourRate = (rate: number) => ({ type: SET_FIRST_HOUR_RATE, payload: rate });
const setMaxChildren = (payload: number) => ({ type: SET_MAX_CHILDREN, payload });
const setFormValue = (payload: string) => ({ type: SET_FORM_VALUE, payload });
const setShowSettings = (payload: boolean) => ({ type: SET_SHOW_SETTINGS, payload });
const selectMaxChildren = (state: *) => state.app.maxChildren;
const selectRate = (state: *) => state.app.rate;
const selectFirstHourRate = (state: *) => state.app.firstHourRate;
const selectFormValue = (state: *) => state.app.formValue;
const selectShowSettings = (state: *) => state.app.showSettings;

export {
  app,
  setRate,
  setFirstHourRate,
  setMaxChildren,
  setFormValue,
  setShowSettings,
  selectFirstHourRate,
  selectMaxChildren,
  selectRate,
  selectShowSettings,
  selectFormValue
};

export type {
  App, AppType
};
