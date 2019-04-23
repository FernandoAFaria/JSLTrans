import React, { Component } from "react";

import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Landing from './components/Landing'


//need navbar, footer, main page, cards




class App extends Component {

  render() {
    return (
      <Router>
        <div className="App" style={{overflowX: 'hidden'}}>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path='/login' component={Dashboard} ></Route>
        <Route exact path='/dashboard' component={Dashboard} ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
