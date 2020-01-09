import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";
import reduxWebsocket from '@giantmachines/redux-websocket';

import { WEBSOCKET_PREFIX } from "../constants/action-types";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the middleware instance.
const reduxWebsocketMiddleware = reduxWebsocket({
	prefix: WEBSOCKET_PREFIX,
	onOpen: (socket) => {
		window.__socket = socket;
	}
});

const store = createStore(
  rootReducer,
  storeEnhancers(
		applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware, reduxWebsocketMiddleware)
	),
);

initialiseSagaMiddleware.run(apiSaga);

export default store;
