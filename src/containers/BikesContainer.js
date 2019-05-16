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
    fetch("/api/v1/bikes.json", {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bikePayload)
    }).then((resp) => {
      if(resp.ok) {
        return resp.json()
      }
      else {
        throw new Error(resp.text())
      }
    }).then((bikeJson) => {
      this.setState({bikes: this.state.bikes.concat(bikeJson.bike)})
    }).catch(err => {
      alert(err)
    })
    return true
  }

  componentDidMount() {
    fetch("/api/v1/bikes.json", {
      headers: {"Content-Type": "application/json"},
      credentials: "same-origin"
    })
      .then(resp => {
        if(resp.ok) {
          return resp.json()
        }
        else {
          throw new Error(resp.body)
        }
      })
      .then(payload => {
        this.setState({bikes: payload.bikes})
      })
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
