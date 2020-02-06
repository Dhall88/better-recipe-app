import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer.js';

const apiKey='ffcad7d6d56f4eb39e6c0f742e23016e';

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
    ingredients:[],
    savedRecipes:[]
  }

  componentDidMount = () => {
    this.getRecipes();
    console.log(this.state.savedRecipes)
  }

  getRecipes = () => {
    fetch('http://localhost:3000/recipes')
    .then(response => response.json())
    .then(json => this.setState({savedRecipes: json}))
    .catch(error => console.error(error))
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
    let name=event.target.innerHTML;
    fetch(`https://api.spoonacular.com/recipes/${event.target.id}/analyzedInstructions?apiKey=${apiKey}`)
    .then((response) => response.json())
      .then((recipeInstructions) => {
        this.setState({
          activeRecipe: recipeInstructions[0].steps,
          displayActive: true,
          displaySearch: false,
          activeRecipeName: name
        })
      })

      fetch(`https://api.spoonacular.com/recipes/${event.target.id}/ingredientWidget.json?apiKey=${apiKey}`)
      .then((response) => response.json())
        .then((recipeIngredients) => {
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

  saveRecipe = (event) => {
    event.preventDefault()
    console.log(typeof this.state.activeRecipeName)
    fetch('http://localhost:3000/recipes', {
      body: JSON.stringify({name: this.state.activeRecipeName, instructions: this.state.activeRecipe, ingredients: this.state.ingredients}),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdRecipe => {
      return createdRecipe.json()
    })
    .then(jsonedRecipe => {
      console.log(jsonedRecipe)
      this.setState({
        savedRecipes: [...this.state.savedRecipes, jsonedRecipe]
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <div classNAme='main'>

        <h1>Better Recipes</h1>

          <div className='container'>

            <div className='saved-timer'>

              <div className='saved-recipes'>
                <h3>Saved Recipes</h3>
                <ul>
              {this.state.savedRecipes.map(recipe => {
                return <li>{recipe.name}</li>
              })}
                </ul>
              </div>

              <div className='timer-container'>
                <h3>Timers</h3>
                <form className='timer-form'>
                  <label htmlFor ='label'>label:</label>
                  <input className="label" type='text' value={this.state.label} onChange={this.handleChange} id='label' />
                  <br />
                  <div className="time-units">
                  <label htmlFor='seconds'>seconds:</label>
                  <input type='number' value={this.state.seconds} onChange={this.handleChange} id='seconds' />
                  <br />
                  <label htmlFor='minutes'>minutes:</label>
                  <input type='number' value={this.state.minutes} onChange={this.handleChange} id='minutes' />
                  <br />
                  <label htmlFor='hours'>hours:</label>
                  <input type='number' value={this.state.hours} onChange={this.handleChange} id='hours' />
                  </div>
                  <br />
                  <input type='submit' value='Create Timer' onClick={this.timerSubmit} />
                </form>

                  <div className='center-timers'>
                  {this.state.timerArr.map((timer)=> {
                        return <Timer label={timer[3]} seconds={timer[0]} minutes={timer[1]} hours={timer[2]}/>
                      }
                    )}
                  </div>

              </div>
            </div>

              <div className='recipe-container'>
                <form className='recipe-form' onSubmit={this.recipeSearch}>
                  <label htmlFor='searchString'>Search Recipes:</label>
                  <input type='text' value={this.state.searchString} onChange={this.handleChange} id='searchString' />
                  <input type='submit' value='Search'/>
                </form>

                <React.Fragment>
                  <ul>
                  {this.state.displaySearch===true?
                    (this.state.searchResults.map((recipe,index)=>{
                      return <li id={recipe.id} onClick={this.activeRecipe}>{recipe.title}</li>
                    })):''
                  }
                  </ul>
                </React.Fragment>

                <React.Fragment>
                {this.state.displayActive===true?
                  <React.Fragment>
                    <form className='save-form' onSubmit={this.saveRecipe}>
                      <input type='hidden' value={this.state.activeRecipeName} onChange={this.handleChange} id='name' />
                      <input type='hidden' value={this.state.activeRecipe} onChange={this.handleChange} id='instructions' />
                      <input type='hidden' value={this.state.ingredients} onChange={this.handleChange} id='ingredients' />
                      <input type='submit' value='Save Recipe'/>
                    </form>
                  </React.Fragment>

                :''}
                </React.Fragment>

                <React.Fragment>
                    {this.state.displayActive===true?
                      <ul className='instructions'>
                        {this.state.activeRecipe.map((steps) => {
                      return <li>{steps.step}</li>
                    })} </ul> :''
                    }
                </React.Fragment>
                </div>

                <React.Fragment>
                {this.state.displayActive===true?

                  <div className='ingredient-placeholder'>
                    <h3>Ingredients</h3>
                    <div className='ingredients'>
                      <ul>
                      {(this.state.ingredients.map((ingredient) => {
                        return <li>{`${ingredient.amount.us.value} ${ingredient.amount.us.unit} of ${ingredient.name}`}</li>
                      }))}
                      </ul>
                    </div>
                  </div>
                  :''
                }

                </React.Fragment>

        </div>

      </div>
    )
  }
}

export default App;
