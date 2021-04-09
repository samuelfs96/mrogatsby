import React, { Component } from 'react'
import mapStyles from './map.module.scss'

var CONSTANTS = require('../../CONSTANTS.json')
console.log(CONSTANTS);

export default class Map extends Component {
  onLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    )
    this.props.onMount(map)
  }

  componentDidMount() {
    if (!window.google) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://maps.google.com/maps/api/js?key='+CONSTANTS.MAP_API_KEY+'&libraries=places'
      const headScript = document.getElementsByTagName('script')[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener('load', () => {
        this.onLoad()
      })
    //for openstreet
    const linkElm = document.createElement('link')
    linkElm.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/leaflet.css'
    linkElm.rel = 'stylesheet'
    headScript.parentNode.insertBefore(linkElm, headScript)
    } else {
      this.onLoad()
    }
  }

  render() {
    return <div className={mapStyles.map} id={this.props.id} />
  }
}