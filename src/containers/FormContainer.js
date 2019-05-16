import React, { Component } from "react";
import InputField from "../components/InputField";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeMake: "",
      bikeModel: "",
      bikeYear: ""
    };

    this.handleMakeChange = this.handleMakeChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearForm = this.clearForm.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  handleMakeChange(event) {
    this.setState({bikeMake: event.target.value})
  }

  handleModelChange(event) {
    this.setState({bikeModel: event.target.value})
  }

  handleYearChange(event) {
    this.setState({bikeYear: event.target.value})
  }

  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value})
  // }

  handleSubmit(event) {
    event.preventDefault()
    let payload = {
      make: this.state.bikeMake,
      year: parseInt(this.state.bikeYear, 10),
      model: this.state.bikeModel
    }

    if(this.props.addNewBike(payload)) {
      this.clearForm()
    }
  }

  clearForm() {
    this.setState({
      bikeMake: "",
      bikeModel: "",
      bikeYear: ""
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <InputField
            label="Bike Make"
            name="bikeMake"
            value={this.state.bikeMake}
            handleChange={this.handleMakeChange}
          />
          <InputField
            label="Bike Model"
            name="bikeModel"
            value={this.state.bikeModel}
            handleChange={this.handleModelChange}
          />
          <InputField
            label="Bike Year"
            name="bikeYear"
            value={this.state.bikeYear}
            handleChange={this.handleYearChange}
          />
          <input type="submit" className="button" />
        </form>
      </div>
    );
  }
}

export default FormContainer;
