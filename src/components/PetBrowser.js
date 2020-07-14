import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  getPetCards = () => {
    return this.props.pets.map(pet => {
      return <Pet onAdoptPet={this.props.onAdoptPet} pet={pet} />
    })
  }

  render() {
    return <div className="ui cards">{this.getPetCards()}</div>
  }
}

export default PetBrowser
