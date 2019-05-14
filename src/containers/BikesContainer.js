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
    fetch('/api/v1/bikes', {
      method: 'POST',
      body: JSON.stringify(bikePayload),
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage);
          throw(error);
        }
      })
     .then(response => response.json())
     .then(body => {
       let newBikes = this.state.bikes.concat(body.bike)
       this.setState({bikes: newBikes})
      })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    fetch('/api/v1/bikes')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage);
          throw(error);
        }
      })
     .then(response => response.json())
     .then(body => {
       this.setState({bikes: body.bikes})
      })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
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
