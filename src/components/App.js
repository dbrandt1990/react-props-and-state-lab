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
  handleFetch = () => {
    fetch(this.state.filters.type == 'all' ?
      "/api/pets" :
      `/api/pets?type=${this.state.filters.type.toLowerCase()}`)
      .then(resp => resp.json())
      .then(json => this.setState({ pets: json }))
  }

  handleAdopt = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p
    })
    this.setState({ pets: pets })
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
              <Filters
                onFindPetsClick={this.handleFetch}
                onChangeType={newType => this.setState({ filters: { type: newType } })} />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.handleAdopt} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
