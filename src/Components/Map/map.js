import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
 
class Map extends React.Component {
    constructor(){
        super()
        this.state = {
          latitude : "",
          longitude:""
        }
      }
    
      componentDidMount() {
        let that = this
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
        }
        function showPosition(position) {
          that.setState ({
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
    
          })
        }
        getLocation()
    
      }
    render(){
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    <Marker
      position={{ lat: -34.397, lng: 150.644 , } } draggable={true} 
    />
  </GoogleMap>
))
        return(
<MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `600px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
  
/>
        )
    }
}

export default Map