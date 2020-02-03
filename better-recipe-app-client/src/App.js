import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer.js'

class App extends Component {
  render () {
  return (
    <div>
    <Timer seconds={1} minutes={1} hours={0} />
    </div>
  )
  }
}

export default App;
