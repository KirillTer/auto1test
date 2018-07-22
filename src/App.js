import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <Blog />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
