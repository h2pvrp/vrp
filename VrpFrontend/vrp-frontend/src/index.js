import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket';
import rootReducer from './reducers'
import App from './components/App'
import { WEBSOCKET_URL } from './constants/config'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const reduxWebsocketMiddleware = reduxWebsocket();
const store = createStore(
    rootReducer,
    applyMiddleware(reduxWebsocketMiddleware)
);
store.dispatch(connect(WEBSOCKET_URL));
//const unsubscribe = store.subscribe(() => console.log(store.getState()))

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
