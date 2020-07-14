import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = event => {
    let answer = event.target.value 
    this.setState({filters: {
      ...this.state.filters,
      type: answer}
    })
  } 

  fetchList = event => {
    let queryString = this.state.filters.type === 'all' ? "" : `?type=${this.state.filters.type}`
    const url = "/api/pets" + queryString 
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        pets: json
      });
    })
  }

  adoptPet = id => {
    const petToAdopt = this.state.pets.find(pet => pet.id === id )
    const petIndex = this.state.pets.indexOf(petToAdopt)
    const newPetsArray = [...this.state.pets]
    newPetsArray[petIndex].isAdopted = true
    this.setState({
      pets: newPetsArray
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchList}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
