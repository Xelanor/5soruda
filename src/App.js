import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar"
import Homepage from './components/HomePage/Homepage'
import Auth from './containers/Auth/Auth'

class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <br />
          <Route path="/" exact component={Homepage} />
          <Route path="/auth" component={Auth} />
        </div>
      </Router>
    );
  }
}

export default App;