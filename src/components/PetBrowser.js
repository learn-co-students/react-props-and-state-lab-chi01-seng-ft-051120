import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
  renderPetCards = () => {
    return this.props.pets.map((pet, idx) => {
      return <Pet pet={pet} key={idx} onAdoptPet={this.props.onAdoptPet}></Pet>;
    });
  };
  render() {
    return <div className="ui cards">{this.renderPetCards()}</div>;
  }
}

export default PetBrowser;
