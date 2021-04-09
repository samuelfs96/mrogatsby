import React from "react"

class WeatherContainer extends React.Component {
  state = {
    city: "",
    country: "",
    temperature: "",
    error: undefined,
    isBusy: false,
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSearch = event => {
    const CONSTANTS = require("../../CONSTANTS.json")
    const WEATHER_URL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      this.state.city +
      "," +
      this.state.country +
      "&appid=" +
      CONSTANTS.WEATHER_API_KEY

    event.preventDefault()
    this.setState({
      isBusy: true,
    })
    fetch(WEATHER_URL)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const kelvin = data.main.temp
        const celcius = Math.round(kelvin - 273.15)
        this.setState({
          temperature: celcius,
          isBusy: false,
          error: undefined,
        })
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isBusy: false,
        })
      })
    console.log(this.state)
  }

  render() {
    let data = null
    if (this.state.isBusy && !this.state.error) {
      data = <p style={{ textAlign: "center" }}> Loading ... </p>
    } else if (this.state.error) {
      data = (
        <p style={{ textAlign: "center" }}>
          Something Went Wrong : {this.state.error}
        </p>
      )
    } else if (this.state.temperature !== "") {
      data = (
        <p style={{ textAlign: "center" }}>
          Temperature is : {this.state.temperature} degree celcius.
        </p>
      )
    }

    return (
      <div className="weather-container">
        <h1>Weather Search</h1>
        <form method="post" onSubmit={this.handleSearch}>
          <p>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </p>
          <input type="submit" value="Search" />
        </form>
        {data}
      </div>
    )
  }
}

export default WeatherContainer
