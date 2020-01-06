import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";

const initialiseSagaMiddleware = createSagaMiddleware();
// import reduxWebsocket from '@giantmachines/redux-websocket';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the middleware instance.
// const reduxWebsocketMiddleware = reduxWebsocket();

const store = createStore(
  rootReducer,
  storeEnhancers(
		// applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware, reduxWebsocketMiddleware)
		applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware)
	),
);

initialiseSagaMiddleware.run(apiSaga);

export default store;
