import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer.js';
import Ingredients from './components/Ingredients.js';
import Saved from './components/Saved.js';

const apiKey='ffcad7d6d56f4eb39e6c0f742e23016e'

class App extends Component {
  state={
    label: '',
    seconds: 0,
    minutes: 0,
    hours: 0,
    timerArr:[],
    searchString:'',
    searchResults:[],
    displaySearch:false,
    activeRecipe: [],
    activeRecipeName: '',
    displayActive: false,
    ingredients:[]
  }

  recipeSearch=(event)=>{
    event.preventDefault();
    fetch(`https://api.spoonacular.com/recipes/search?query=${this.state.searchString}&apiKey=${apiKey}`)
    .then((response) => response.json())
      .then((recipeSearch) => {
        this.setState({
          searchResults: recipeSearch.results,
        displaySearch: true
      })
      })
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  activeRecipe = (event) => {
    event.preventDefault();
    fetch(`https://api.spoonacular.com/recipes/${event.target.id}/analyzedInstructions?apiKey=${apiKey}`)
    .then((response) => response.json())
      .then((recipeInstructions) => {
        this.setState({
          activeRecipe: recipeInstructions[0].steps,
          displayActive: true,
          displaySearch: false,
          activeRecipeName: searchResults[event.target.index].title
        })
      })

      fetch(`https://api.spoonacular.com/recipes/${event.target.id}/ingredientWidget.json?apiKey=${apiKey}`)
      .then((response) => response.json())
        .then((recipeIngredients) => {
          console.log(recipeIngredients.ingredients)
          this.setState({
            ingredients: recipeIngredients.ingredients
          })
        })
  }

  timerSubmit =(event) => {
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
    <div className='main'>
      <h1>Better Recipes</h1>
      <div className='container'>
        <div className='saved-timer'>
          <h3>Saved Recipes</h3>

          <Saved />

        <div className='timer-container'>
          <form className='timer-form' onSubmit={this.timerSubmit}>
            <label htmlFor ='label'>label</label>
            <input type='text' value={this.state.label} onChange={this.handleChange} id='label' />
            <br />
            <label htmlFor='seconds'>seconds</label>
            <input type='number' value={this.state.seconds} onChange={this.handleChange} id='seconds' />
            <br />
            <label htmlFor='minutes'>minutes</label>
            <input type='number' value={this.state.minutes} onChange={this.handleChange} id='minutes' />
            <br />
            <label htmlFor='hours'>hours</label>
            <input type='number' value={this.state.hours} onChange={this.handleChange} id='hours' />
            <br />
            <input type='submit' />
          </form>

            <div className='timer-list'>
              {this.state.timerArr.map((timer)=> {
                return <Timer label={timer[3]} seconds={timer[0]} minutes={timer[1]} hours={timer[2]}/>
              })}
            </div>

          </div>
        </div>

        <div className='recipe-container'>
          <form className='recipe-form' onSubmit={this.recipeSearch}>
            <label htmlFor='searchString'>Search Recipes</label>
            <input type='text' value={this.state.searchString} onChange={this.handleChange} id='searchString' />
            <input type='submit' />
          </form>

          <div>
          {this.state.displaySearch===true?
            (this.state.searchResults.map((recipe,index)=>{
              return <li index={index} id={recipe.id} recipe={recipe} onClick={this.activeRecipe}>{recipe.title}</li>
            })):''
          }
          </div>

          <div className='instructions'>
            {this.state.displayActive===true?
              (
            <form className='save-form' onSubmit={this.saveRecipe}>
                <input type='hidden' value={this.state.activeRecipeName} onChange={this.handleChange} id='name' />
            
              this.state.activeRecipe.map((steps) => {
              return <li>{steps.step}</li>
            })):''
          }
          </div>

            {this.state.displayActive===true?
            (
              <div className='ingredients'>
                <div>
                <div>
                {(this.state.ingredients.map((ingredient) => {
                  return <li>{ingredient.amount.us.value}</li>
                }))}
                </div>
                <div>
                {(this.state.ingredients.map((ingredient) => {
                  return <li>{ingredient.amount.us.unit}</li>
                }))}
                {(this.state.ingredients.map((ingredient) => {
                  return <li>{ingredient.name}</li>
                }))}
                </div>
                </div>
              </div>
          )
            : ''
          }
        </div>

        <div className='ingredient-placeholder'></div>
      </div>

    </div>
  )
  }
}

export default App;
