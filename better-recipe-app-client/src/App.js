import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer.js';
import Ingredients from './components/Ingredients.js';
import Saved from './components/Saved.js';

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
    let sample="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean leo massa, convallis a ipsum eget, hendrerit suscipit lorem. Donec non dolor ut tellus euismod mollis nec placerat mauris. Vestibulum at elit posuere dolor varius molestie. Aenean at sem nec est rutrum dapibus sed a lectus. Cras sit amet ex finibus, interdum sem vitae, tempus sapien. Fusce ac volutpat nisi. Cras placerat leo vel tempus placerat. Etiam tortor sem, dictum a semper vel, ullamcorper quis dui. Suspendisse pharetra non risus blandit interdum. Aliquam luctus hendrerit felis, ac pulvinar felis suscipit sed. Duis non nulla sit amet augue luctus laoreet. Curabitur turpis sapien, gravida in leo quis, sollicitudin dictum augue. Proin sed purus at mi iaculis aliquam at non lectus. Pellentesque sollicitudin augue et diam maximus, a tincidunt nunc maximus. Nulla ac tellus pretium, dignissim tortor quis, semper nunc. Suspendisse potenti. Sed ac tincidunt diam. Phasellus dictum scelerisque imperdiet. Ut molestie ornare turpis nec bibendum. Nunc tempus pretium ligula, vitae porta erat posuere ac. Integer aliquam erat sit amet mi facilisis gravida. Nullam ut augue fringilla, aliquam metus a, tincidunt dui. Curabitur quis odio justo. Proin justo felis, porttitor non pulvinar ac, suscipit ut justo. Sed auctor leo ac erat iaculis consequat. Morbi ut elit est. Duis dolor metus, viverra ut ullamcorper eget, sodales non diam. Vivamus lacinia, nulla eu euismod sodales, nisi ante egestas ante, iaculis faucibus nisl libero quis dui. Quisque aliquet risus ut bibendum vestibulum. Mauris convallis mattis faucibus. In hac habitasse platea dictumst. Pellentesque a fermentum sem. Fusce sem elit, tincidunt vitae gravida sit amet, lobortis sed mi. Fusce sem turpis, rhoncus vel viverra sodales, auctor non orci. Donec vel lacinia risus. In euismod molestie sollicitudin. Curabitur leo elit, varius sed dapibus quis, gravida ut odio. Nulla odio dui, iaculis quis velit in, scelerisque viverra quam. Cras eget venenatis velit. Etiam in pellentesque enim, nec rhoncus lorem. Nunc eu tristique quam, et consectetur felis. Curabitur vitae auctor magna, nec ultricies odio. Duis fermentum consectetur neque ut posuere. Pellentesque finibus congue molestie. Fusce malesuada finibus fermentum. Duis finibus ligula sed felis consequat hendrerit. Donec odio dolor, eleifend eu dolor vel, congue laoreet tellus. Ut quis eros eget diam tincidunt fermentum. Vivamus ullamcorper mauris at viverra viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum scelerisque ut est in ultrices. In hac habitasse platea dictumst. Curabitur sodales sagittis orci, venenatis blandit eros mollis eu. Curabitur posuere nunc a enim vulputate lobortis. Maecenas sed neque sit amet turpis fermentum consectetur sed vitae metus. Proin id laoreet orci, eget fermentum lectus. Phasellus sed leo quis quam semper venenatis id id diam. In lobortis in diam non hendrerit. Aenean elit velit, aliquam non massa nec, fringilla varius ex. Suspendisse justo justo, egestas at ante et, vehicula fermentum nisl. Vestibulum sit amet pellentesque dolor. Nullam sapien odio, porttitor eu purus at, gravida facilisis felis. Sed leo nibh, vehicula non nibh et, viverra accumsan ante. Etiam lectus dui, volutpat at feugiat eget, faucibus sit amet lacus. Donec in enim viverra, lacinia enim sed, rhoncus augue. Nam facilisis augue et sollicitudin tristique. Aliquam aliquam velit lacus, ut ornare arcu venenatis at. Quisque vehicula ultricies neque in feugiat. Duis ut quam a urna commodo iaculis."
  return (
    <div className='container'>
      <Saved />
      <div className='timer-container'>
        <form className='timer-form' onSubmit={this.handleSubmit}>
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
        <div className='timer-list'>
          {this.state.timerArr.map((timer)=> {
            return <Timer label={timer[3]} seconds={timer[0]} minutes={timer[1]} hours={timer[2]}/>
          })}
        </div>
      </div>
      <div className='active'>
        <p>{sample}</p>
        <p>{sample}</p>
      </div>
      <div className='ingredient-placeholder'>
      </div>
        <Ingredients />
    </div>
  )
  }
}

export default App;
