/*!

=========================================================
* Material Dashboard PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

import LandingPage from "./views/Pages/LandingPage";
import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";
import history from './store/router/history';
import ConfirmPage from "views/Pages/ConfirmPage";
import 'app.css';
const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route path='/auth' component={AuthLayout} />
          <Route path='/dashboard' component={AdminLayout} />
          <Route path='/' component={LandingPage} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
