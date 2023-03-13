import React, { Component } from "react";
import ProfilePage from '../ProfilePage';
import '../Sidebar.css';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';

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
    comment: string;
  } | null;
  comment: string;
  savedMarkers: Array<{ lat: number, lng: number, comment: string }>;
  selectedMarker: { lat: number, lng: number, comment: string } | null;
}

export default class MainPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authToken: props.authToken,
      mapCenter: {
        lat: 47.1625,
        lng: 19.5033
      },
      markerPosition: null,
      comment: '',
      savedMarkers: [],
      selectedMarker: null
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
      this.setState(prevState => ({
        savedMarkers: [...prevState.savedMarkers, { lat: markerPosition.lat, lng: markerPosition.lng, comment: comment }],
        markerPosition: null,
        comment: ''
      }));
    }
  };

  handleMarkerClick = (event: google.maps.MapMouseEvent) => {
    event.latLng &&
      this.setState({
        markerPosition: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          comment: this.state.comment
        },
        selectedMarker: null
      });
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
  const { markerPosition, comment, savedMarkers } = this.state;
  return (
    <div>
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
      <LoadScript googleMapsApiKey="AIzaSyAe4uKw0R1s4MBqPzeER_kXIGITrs4Gwvg">
        <GoogleMap
          mapContainerStyle={{ height: "700px", width: "100%" }}
          center={this.state.mapCenter}
          zoom={6}
          onClick={this.handleMarkerClick}
        >
          {savedMarkers.map(marker => (
  <Marker
    key={`${marker.lat}-${marker.lng}`}
    position={{ lat: marker.lat, lng: marker.lng }}
    onClick={() => {
      this.setState({
        selectedMarker: marker
      });
    }}
  >
    {this.state.selectedMarker === marker && (
      <InfoWindow
        position={{ lat: marker.lat, lng: marker.lng }}
        onCloseClick={() => {
          this.setState({
            selectedMarker: null
          });
        }}
      >
        <div>
          <p>Szélességkör: {marker.lat}</p>
          <p>Hosszúság: {marker.lng}</p>
          {marker.comment && <p>Megjegyzés: {marker.comment}</p>} {/* Add this line */}
        </div>
      </InfoWindow>
    )}
  </Marker>
))}

          {markerPosition && (
            <Marker
              position={markerPosition}
              icon={{
                url: "https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
                scaledSize: new window.google.maps.Size(32, 32)
              }}
            />
          )}
          {this.state.selectedMarker && (
            <InfoWindow
              position={{ lat: this.state.selectedMarker.lat, lng: this.state.selectedMarker.lng }}
              onCloseClick={() => {
                this.setState({
                  selectedMarker: null
                });
              }}
            >
              <div>
                <p>Szélességkör: {this.state.selectedMarker.lat}</p>
                <p>Hosszúság: {this.state.selectedMarker.lng}</p>
                <p>Megjegyzés: {this.state.selectedMarker.comment}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
}
