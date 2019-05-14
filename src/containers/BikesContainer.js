import React, { Component } from 'react';
import BikesIndex from '../components/BikesIndex'
import FormContainer from './FormContainer'

class BikesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikes: []
    }
    this.addNewBike = this.addNewBike.bind(this)
  }

  addNewBike(bikePayload) {

  }

  componentDidMount() {
    
  }

  render() {
    return(
      <div className="container">
        <h1>My Favorite Bikes</h1>
        <hr />
        <BikesIndex
          bikes={this.state.bikes}
        />
        <FormContainer
          addNewBike={this.addNewBike}
        />
      </div>
    )
  }

}

export default BikesContainer;
