import React, { Component } from "react";
import ProfilePage from '../ProfilePage';
import '../Sidebar.css';
import './Map.css';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBook, faCalendar, faFish, faImages, faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';



import './Blog.css';
import { Link } from "react-router-dom";

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

interface State {
  authToken: string;
  appLoaded: boolean;
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
  private readonly mapRef = React.createRef<GoogleMap>();

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
      selectedMarker: null,
      appLoaded: false,
    };
  }

  componentDidMount() {
    let authToken = localStorage.getItem('authToken');
    fetch(`http://localhost:3000/locations/info`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        const savedMarkers = data.map((location: any) => ({
          lat: location.lat,
          lng: location.lng,
          comment: location.comment
        }));
        this.setState({
          savedMarkers: savedMarkers,
          appLoaded: true
        });
      })
      .catch(error => console.error(error));
  }

  handleMarkerSave = () => {
    const { markerPosition, comment } = this.state;
    if (markerPosition) {
      const data = {
        xLoccord: markerPosition.lat,
        yLoccord: markerPosition.lng,
        comment: comment
      };
      let authToken =  localStorage.getItem('authToken');
      fetch('http://localhost:3000/locations/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          this.setState(prevState => ({
            savedMarkers: [...prevState.savedMarkers, { lat: markerPosition.lat, lng: markerPosition.lng, comment: comment }],
            markerPosition: null,
            comment: ''
          }));
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
  const { markerPosition, comment, savedMarkers, selectedMarker, appLoaded } = this.state;
  function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="main-page-container">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <div className="header">
        <h2 className="oldal">Fő oldal</h2>
      
        <ProfilePage authToken={this.props.authToken} onLogout={this.props.onLogout} />
      </div>
      <div className="map-container">
        <div>
          {markerPosition && (
            <>
              <textarea className="comment" placeholder="Ide írd a megjegyzéseket..." value={comment} onChange={this.handleCommentChange} />
              <button className="savebutton" onClick={this.handleMarkerSave}>Mentés</button>
            </>
          )}
        </div>
        {appLoaded && (
          <LoadScript googleMapsApiKey="AIzaSyAe4uKw0R1s4MBqPzeER_kXIGITrs4Gwvg">
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
              center={this.state.mapCenter}
              ref={this.mapRef}
              zoom={7}
              onClick={this.handleMarkerClick}
            >
              {savedMarkers.map(marker => (
                <Marker
                  key={`${marker.lat}-${marker.lng}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => {
                    this.setState({
                      selectedMarker: marker,
                      markerPosition: null,
                      comment: ''
                    });
                  }}
                >
                  {selectedMarker === marker && (
                    <InfoWindow onCloseClick={() => {
                      this.setState({
                        selectedMarker: null
                      });
                    }}>
                      <div>
                <p>Szélességkör: {marker.lat}</p>
                <p>Hosszúság: {marker.lng}</p>
                <p>Megjegyzés: {marker.comment}</p>
              </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
              {markerPosition && (
                <Marker
                  position={markerPosition}
                  draggable={true}
                  onDragEnd={this.handleMarkerSave}
                />
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    <div className="card-container">
          <div className="card">
            <h2><img src="https://cdn-icons-png.flaticon.com/512/4002/4002787.png" className="iconrendezes"></img><Link to="/calendar" className="infoalso">Horgász naptár</Link></h2>
            <p>Segít megtervezni a horgász kirándulásokat és emlékeztet a fontos dátumokra, például fogási tilalmakra.
               De mi magunk is adhatunk hozzá tetszőleges eseményeket.
               Praktikus minden horgász számára, aki szeretne naprakész lenni a horgászszezon alatt.</p>
          </div>
          <div className="card">
            <h2><img src="https://cdn-icons-png.flaticon.com/512/5273/5273479.png" className="iconrendezes"></img><Link to="/catchdiary" className="infoalso">Töltsd fel fogásaid</Link></h2>
            <p>Online horgásznapló az interneten történő fogások nyomon követéséhez.
               Könnyen használható felület, rögzíti a hal fajtáját, méretét, helyszínét, dátumát és egyéb fontos információkat.
                Az adatok bármikor elérhetők az online felületen keresztül.</p>
          </div>
          <div className="card">
            <h2 className="elrendezes"><img src="https://cdn-icons-png.flaticon.com/512/8901/8901481.png" className="iconrendezes"></img><Link to="/blog" className="infoalso">Nézz körül a Blogon</Link></h2>
            <p>Tájékozódj a legújabb horgász trendekről és hasznos tippekről a horgászat világában.
               A blog minden horgász számára hasznos lehet, legyen az kezdő vagy haladó szinten horgászó.
                Olvasd el a szakértők tanácsait, és fejleszd tovább a tudásodat a horgászat terén!</p>
          </div>
        </div>
    </div>
  );
}
}
