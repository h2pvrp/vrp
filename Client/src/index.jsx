import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./js/store/index";
import App from "./js/components/App";
import Register from "./js/components/Register";
import "bootstrap/dist/css/bootstrap.css";

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/" component={App} /> {/**this have to be last route */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
