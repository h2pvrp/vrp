import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket';
import { WEBSOCKET_URL } from '../constants/config'

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the middleware instance.
const reduxWebsocketMiddleware = reduxWebsocket();

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(initialiseSagaMiddleware, reduxWebsocketMiddleware)
  ),
);

initialiseSagaMiddleware.run(apiSaga);

store.dispatch(connect(WEBSOCKET_URL));
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

export default store;
