import React, { Component } from "react";

import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Contact from './components/Contact'
import Tracking from './components/Tracking'


//need navbar, footer, main page, cards




class App extends Component {

  render() {
    return (
      <Router>
        <div className="App" style={{ overflowX: 'hidden', margin: '0', marginBottom: '-100px' }}>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path='/login' component={Dashboard} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/contact' component={Contact} />
          <Route path="/track/:pro" component={Tracking} />
        </div>
      </Router>
    );
  }
}

export default App;
