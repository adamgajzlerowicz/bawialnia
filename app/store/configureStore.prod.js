// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';

import rootReducer from '../reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = compose(applyMiddleware(thunk, router), persistState);

function configureStore(initialState?: * ) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
