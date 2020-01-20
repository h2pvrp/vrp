import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket';
import { WEBSOCKET_URL } from '../constants/config'
import { add_result } from '../actions/index'


const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the middleware instance.
const reduxWebsocketMiddleware = reduxWebsocket();

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(reduxWebsocketMiddleware)
  ),
);

store.dispatch(connect(WEBSOCKET_URL));

// const unsubscribe = store.subscribe(() => console.log(store.getState()))

export default store;
