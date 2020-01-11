// AFTER MERGING PLS FIX
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


import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./js/store/index";
import App from "./js/components/App";
import Register from "./js/components/Register";
import { NavMenu } from "./js/components/NavMenu";
// import AuthorizeRoute from "./js/components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./js/components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./js/components/api-authorization/ApiAuthorizationConstants";

import "bootstrap/dist/css/bootstrap.css";

const reduxWebsocketMiddleware = reduxWebsocket();
const store = createStore(
    rootReducer,
    applyMiddleware(reduxWebsocketMiddleware)
);
store.dispatch(connect(WEBSOCKET_URL));
//const unsubscribe = store.subscribe(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <BrowserRouter>
      <NavMenu />
      <Switch>
        <Route path="/register" component={Register} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <Route path="/login" component={ApiAuthorizationRoutes} />
        <Route path="/" component={App} /> {/**this have to be last route */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
