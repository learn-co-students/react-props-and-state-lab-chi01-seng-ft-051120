import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value,
      },
    });
  };

  onFindPetsClick = () => {
    let url = "";
    // Needs refactoring, check for not 'all' and then interpolate
    // state type
    if (this.state.filters.type === "all") {
      url = "/api/pets";
    }

    if (this.state.filters.type === "cat") {
      url = "/api/pets?type=cat";
    }

    if (this.state.filters.type === "dog") {
      url = "/api/pets?type=dog";
    }

    if (this.state.filters.type === "micropig") {
      url = "/api/pets?type=micropig";
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((petsData) => {
        this.setState({
          pets: petsData,
        });
        console.log(petsData);
      });
  };

  onAdoptPet = (id) => {
    // get the id
    // loop/find through all the pets
    const updatedPets = this.state.pets.map((pet) => {
      if (pet.id === id) {
        // change the value of isAdopted to true
        return {
          ...pet,
          isAdopted: true,
        };
      } else {
        return pet;
      }
    });

    // setState
    this.setState({
      pets: updatedPets,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
