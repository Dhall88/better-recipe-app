import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer.js'

class App extends Component {
  state={
    label: '',
    seconds: 0,
    minutes: 0,
    hours: 0,
    timerArr:[]
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit =(event) => {
    event.preventDefault()
    let arrItem = [this.state.seconds,this.state.minutes,this.state.hours,this.state.label]
    this.setState({
      label:'',
      seconds:0,
      minutes:0,
      hours:0,
      timerArr:[...this.state.timerArr,arrItem]
    })
  }
  
  render () {
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <label for='label'>label</label>
        <input type='text' value={this.state.label} onChange={this.handleChange} id='label' />
        <br />
        <label for='seconds'>seconds</label>
        <input type='number' value={this.state.seconds} onChange={this.handleChange} id='seconds' />
        <br />
        <label for='minutes'>minutes</label>
        <input type='number' value={this.state.minutes} onChange={this.handleChange} id='minutes' />
        <br />
        <label for='hours'>hours</label>
        <input type='number' value={this.state.hours} onChange={this.handleChange} id='hours' />
        <br />
        <input type='submit' />
      </form>
      <button onClick={this.createTimer}>Create Timer</button>
    {this.state.timerArr.map((timer)=> {
      return <Timer label={timer[3]} seconds={timer[0]} minutes={timer[1]} hours={timer[2]}/>
    })}
    </div>
  )
  }
}

export default App;
