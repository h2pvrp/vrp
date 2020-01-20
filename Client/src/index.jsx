import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import App from "./js/components/App";
import { NavMenu } from "./js/components/NavMenu";
import AuthorizeRoute from "./js/components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./js/components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./js/components/api-authorization/ApiAuthorizationConstants";
import Statistics from "./js/components/statistics-view";

import rootReducer from "./js/reducers";
import store from "./js/store/index";

render(
  <Provider store={store}>
    <BrowserRouter>
      <NavMenu />
      <Switch>
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <AuthorizeRoute path="/statistics" component={Statistics} />
        <Route path="/login" component={ApiAuthorizationRoutes} />
        <Route path="/" component={App} /> {/**this have to be last route */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
