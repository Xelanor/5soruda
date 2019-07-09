import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";

import { Provider } from "react-redux";
import store from "./store/store";

import Navbar from "./components/Layout/Navbar/Navbar"
import Homepage from './components/Layout/HomePage/Homepage'
import Register from './containers/Auth/Register'
import Login from './containers/Auth/Login'
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./containers/Dashboard/Dashboard";
import Test from './containers/Test/Test'
import CreateQuestion from './containers/Admin/CreateQuestion'
import ViewTest from './containers/Test/ViewTest/ViewTest'
import ContinueTest from './containers/Test/ContinueTest/ContinueTest'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  state = {}
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route path="/" exact component={Homepage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/demo" component={Test} />
              <PrivateRoute exact path="/new-question" component={CreateQuestion} />
              <PrivateRoute exact path="/test-goruntule/:id" component={ViewTest} />
              <PrivateRoute exact path="/test/:id" component={ContinueTest} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;