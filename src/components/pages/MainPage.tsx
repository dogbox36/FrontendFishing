import React, { Component } from "react";
import ProfilePage from '../ProfilePage';
import '../Sidebar.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

interface State {
  authToken: string;
  mapCenter: {
    lat: number;
    lng: number;
  };
  markerPosition: {
    lat: number;
    lng: number;
  } | null;
  comment: string;
}

export default class MainPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authToken: props.authToken,
      mapCenter: {
        lat: 39.8283,
        lng: -98.5795
      },
      markerPosition: null,
      comment: ''
    };
  }

  handleMarkerSave = () => {
    const { markerPosition, comment } = this.state;
    if (markerPosition) {
      const data = {
        lat: markerPosition.lat,
        lng: markerPosition.lng,
        comment: comment
      };
      console.log(data); // itt lehet az adatokkal valamit tenni (pl. külső függvény meghívása)
      this.setState({
        markerPosition: null,
        comment: ''
      });
    }
  };

  handleMarkerClick = (event: google.maps.MapMouseEvent) => {
    event.latLng && this.setState({
      markerPosition: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    })
  };

  handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      comment: event.target.value
    });
  };

  handleLogout = async () => {
    await this.props.onLogout();
  };

  render() {
    const { markerPosition, comment } = this.state;
    return (
      <div>
        <LoadScript googleMapsApiKey="AIzaSyAe4uKw0R1s4MBqPzeER_kXIGITrs4Gwvg">
          <GoogleMap
            mapContainerStyle={{ height: "500px", width: "100%" }}
            center={this.state.mapCenter}
            zoom={6}
            onClick={this.handleMarkerClick}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </LoadScript>
        <div>
          <button className="logoutbutton" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
        <div>
          <ProfilePage authToken={this.props.authToken} onLogout={this.props.onLogout} />
        </div>
        <div>
          {markerPosition && (
            <>
              <textarea value={comment} onChange={this.handleCommentChange} />
              <button onClick={this.handleMarkerSave}>Save Marker</button>
            </>
          )}
        </div>
      </div>
    );
  }
}
