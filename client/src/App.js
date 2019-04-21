import React, { Component } from "react";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar'
import Landing from './components/Landing'


//need navbar, footer, main page, cards



class App extends Component {

  

  render() {
    return (
      <Router>
        <div className="App" style={{overflowX: 'hidden'}}>
        <Navbar />
        <Landing />
         
        </div>
      </Router>
    );
  }
}

export default App;
