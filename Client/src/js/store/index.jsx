import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket';
import { WEBSOCKET_URL } from '../constants/config'
import { add_route } from '../actions/index'

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


const r =  [
    {
      polyline: [
        [52.2175990227452, 21.042828106152534],
        [52.2296920181494, 21.011738802843063],
        [52.22432944398149, 20.964503673505515],
      ],
      color: '#3388ff',
      hidden: false,
      name: 'Worker 1',
    },
    {
      polyline: [
        [52.21002607957454, 20.996108269135],
        [52.2059235296225, 21.016204669616805],
        [52.22254177532672, 21.043343398472587],
      ],
      color: '#ff8833',
      hidden: false,
      name: 'Worker 1.2',
    },
    {
      polyline: [
        [52.25019000601295, 20.993360043428115],
        [52.23852308138769, 20.96965659670597],
        [52.20855341292023, 20.972404822412894],
      ],
      color: '#ff3388',
      hidden: false,
      name: 'Worker 3000',
    },
];


store.dispatch(add_route(r[0]));
store.dispatch(add_route(r[1]));
store.dispatch(add_route(r[2]));

// const unsubscribe = store.subscribe(() => console.log(store.getState()))

export default store;
