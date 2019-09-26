import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from "react-geocode";
import {Friend} from 'the.rest/dist/to-import';
import { Link } from 'react-router-dom';

class Maps extends Component{
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      city: {},
      country: '',
      allFriends: [],
      positionOnMap: true,
      showingInfoWindow: false,
      activeMarker: {},
      selectedFriend: ''
    }

  }

  async getCoordinates(){
    await this.getPositon();
    Geocode.setApiKey('AIzaSyD3ErY-Q67YU4XDKrtsPj8iA3xYfMo-0CI')
    let position = this.state.city + " "+ this.state.country
    
    Geocode.fromAddress(position).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({stores: [{'latitude': lat, 'longitude': lng, 'firstName': this.state.firstName}]});
      },
      error => {
        this.setState({positionOnMap: false})
      }
    );
  }

  async getPositon(){
    let friend = await Friend.findOne({_id: this.props.match.params.id})
    this.setState ({'city': friend.city, 'country': friend.country, 'firstName': friend.firstName})
  }


  async getAllFriends(){
    let allFriends = await Friend.find().limit(10);
    this.setState({ 'allFriends': allFriends });
    this.getAllCoordinates();    
  }

  getAllCoordinates(){
    Geocode.setApiKey('AIzaSyD3ErY-Q67YU4XDKrtsPj8iA3xYfMo-0CI')
    let position;
    this.state.allFriends.map(item =>(
      position = item.city + " "+ item.country,
      Geocode.fromAddress(position).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({ stores: [...this.state.stores, {'latitude': lat, 'longitude': lng, 'firstName': item.firstName, 'personId': this.state._id}]})       
        },
        error => {
         // this.setState({positionOnMap: false})
        }
      )
    ))
  }

  componentDidMount(){
    if (window.location.pathname === '/'){
      this.getAllFriends()
    }else{
      this.getCoordinates()
    }
  }
  
  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }}
      onClick={ (props, marker) => {
        this.setState({
          activeMarker: marker,
          showingInfoWindow: true,
          //selectedFriend: [...this.state.selectedFriend, {'name': store.firstName , 'id': store.personId} ],
          selectedFriend: store.firstName
        });
      }}/>
    })    
  }
  
    render() {
      const mapStyles = {
        width: '90vw',
        height: '70vh',
        margin: '2vh 0vw 0 5vw'
      };
      if (window.location.pathname === '/'){
        return (
          <>
            <Map
              id='map'
              google={this.props.google}
              zoom={3}
              style={mapStyles}
              minZoom={2}
            >
              {this.displayMarkers()}
              <InfoWindow
              marker = { this.state.activeMarker }
              visible = { this.state.showingInfoWindow }
              >
                <h5>{this.state.selectedFriend}</h5>
              </InfoWindow>

            </Map> 
          </>
        );  
      }
      else {
        return (
          <>
            <Link to={`/friendPage/${this.props.match.params.id}`} className="linkStyle">
              <button type="button" className="btn btn-secondary backButton">Back</button>
            </Link>
            {this.state.positionOnMap ? 
              <Map
                id='map'
                google={this.props.google}
                zoom={9}
                minZoom={3}
                style={mapStyles}
                center={{
                  lat: this.state.stores[0] && this.state.stores[0].latitude || 0, 
                  lng: this.state.stores[0] && this.state.stores[0].longitude || 0
                }}
              >
                {this.displayMarkers() }
                <InfoWindow
                marker = { this.state.activeMarker }
                visible = { this.state.showingInfoWindow }
                >
                  <h5>{this.state.selectedFriend}</h5>
                </InfoWindow>
              </Map> 
              :
              <h1 style = {{margin: 0}}>Position was not found</h1>
            }
          </>
        );
      }
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3ErY-Q67YU4XDKrtsPj8iA3xYfMo-0CI'
})(Maps);

