// @flow

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { app } from './app';
import { children } from './children';

const rootReducer = combineReducers({
  app,
  children,
  router,
});

export default rootReducer;
